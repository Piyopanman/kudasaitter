import { useState, useRef } from "react";
import React from "react";
import { Stage, Layer, Image as Img, Text } from "react-konva";
import Konva from "konva";
import Image from "next/image";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import { generateUUID } from "../utils/generateUUID";
import { saveOgp } from "../repository/saveOgp";
import textState from "../recoil/atoms/textState";
import {
  Box,
  Center,
  Textarea,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Grid,
  GridItem,
  Text as T,
} from "@chakra-ui/react";
import { useRecoilState } from "recoil";

const layer = new Konva.Layer();

const TopPage = () => {
  let initialImageState;
  if (process.browser) {
    initialImageState = new window.Image();
    initialImageState.src = "shuchusen.png";
  }
  const router = useRouter();
  const imageArray = ["hukidashi.png", "kouhaku.png", "shuchusen.png"];

  const [text, setText] = useRecoilState(textState);
  const [fontSize, setFontSize] = useState<number>(40);
  const [image, setImage] =
    useState<HTMLImageElement | undefined>(initialImageState);
  const stageRef = useRef(null);

  const submit = async () => {
    const uuid = generateUUID();
    //@ts-ignore
    const dataURL = await stageRef.current.toDataURL({ pixelRatio: 2 });
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
      <Box m={5}>
        <Box textAlign="center">
          <Box>
            <T textAlign="center" fontSize="xl" mt={10}>
              文字を入力してください
            </T>
            <Textarea
              placeholder="(例)5000兆円欲しい！！！"
              width="70%"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>
          <Box>
            <T textAlign="center" fontSize="xl" mt={10}>
              背景画像を選んでください
            </T>
            <Grid templateColumns="repeat(3, 1fr)" gap={2}>
              {imageArray.map((image, index) => (
                <GridItem
                  cursor="pointer"
                  p={1}
                  _hover={{
                    bgColor: "blue.50",
                  }}
                >
                  <Image
                    src={`/${image}`}
                    width={300}
                    height={155}
                    onClick={() => changeImage(image)}
                    key={index}
                  />
                </GridItem>
              ))}
            </Grid>
          </Box>

          <Box>
            <T textAlign="center" fontSize="xl" mt={10}>
              文字のサイズを選んでください
            </T>
            <Slider
              aria-label="slider-1"
              width="70%"
              size="md"
              onChangeEnd={(val) => setFontSize(val)}
              defaultValue={40}
              min={5}
              max={200}
              focusThumbOnChange={false}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Box>
        <Center mt={10}>
          <Stage width={600} height={315} ref={stageRef}>
            <Layer>
              <Img image={image} />
              <Text
                text={text}
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
        </Center>
        <Center>
          <Button my={10} onClick={submit} size="lg">
            生成する！！
          </Button>
        </Center>
      </Box>
    </Layout>
  );
};

export default TopPage;
