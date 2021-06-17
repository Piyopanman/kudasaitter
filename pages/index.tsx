import { useState, useRef } from "react";
import React from "react";
import { Stage, Layer, Image as Img, Text } from "react-konva";
import Konva from "konva";
import Image from "next/image";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import { generateUUID } from "../utils/generateUUID";
import { saveOgp } from "../repository/saveOgp";
import { Box } from "@chakra-ui/react";

const layer = new Konva.Layer();

const TopPage = () => {
  let initialImageState;
  if (process.browser) {
    initialImageState = new window.Image();
    initialImageState.src = "shuchusen.png";
  }
  const router = useRouter();
  const fontSizeArray = Array.from(Array(20), (_, i) => i * 5 + 30);
  const imageArray = [
    "hukidashi.png",
    "kouhaku.png",
    "shuchusen.png",
    "muji.png",
  ];

  const [moji, setMoji] = useState<string>("文字を入力してください");
  const [fontSize, setFontSize] = useState<number>(30);
  const [image, setImage] =
    useState<HTMLImageElement | undefined>(initialImageState);
  const stageRef = useRef(null);

  const submit = async () => {
    const uuid = generateUUID();
    //@ts-ignore
    const dataURL = await stageRef.current.toDataURL();
    await saveOgp(dataURL, uuid);
    router.push(`/${uuid}`);
  };

  const changeImage = (imageUrl: string) => {
    if (process.browser) {
      const updatedImage = new window.Image();
      updatedImage.src = imageUrl;
      setImage(updatedImage);
      layer.draw();
    }
  };

  return (
    <Layout>
      <Box>
        <h1>画像生成</h1>
        <form>
          <textarea value={moji} onChange={(e) => setMoji(e.target.value)} />
          <select onChange={(e) => setFontSize(Number(e.target.value))}>
            {fontSizeArray.map((size) => (
              <option value={size} key={size}>
                {size}
              </option>
            ))}
          </select>
        </form>
        <div>
          <ul>
            {imageArray.map((image, index) => (
              <Image
                src={`/${image}`}
                width={300}
                height={155}
                onClick={() => changeImage(image)}
                key={index}
              />
            ))}
          </ul>
        </div>
        <button onClick={submit}>生成する</button>

        <Stage width={600} height={315} ref={stageRef} className="hoe">
          <Layer>
            <Img image={image} />
            <Text
              text={moji}
              fontSize={fontSize}
              fontStyle="bold"
              align="center"
              verticalAlign="middle"
              x={50}
              y={15}
              strokeWidth={100}
              wrap="char"
              height={300}
              width={500}
            />
          </Layer>
        </Stage>
      </Box>
    </Layout>
  );
};

export default TopPage;
