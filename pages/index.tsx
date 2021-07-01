import { useState, useEffect, useRef } from "react";
import React from "react";
import Konva from "konva";
import { useRouter } from "next/router";
import "react-color-palette/lib/css/styles.css";
import textState from "../recoil/atoms/textState";
import { Box } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import Layout from "../components/Layout";
import Info from "../components/pages/Info";
import Keyword from "../components/pages/Keyword";
import { generateUUID } from "../utils/generateUUID";
import { saveOgp } from "../repository/saveOgp";
import FontColor from "../components/pages/FontColor";
import TextArea from "../components/pages/TextArea";
import BgImage from "../components/pages/BgImage";
import FontSize from "../components/pages/FontSize";
import Canvas from "../components/pages/Canvas";
import GenerateButton from "../components/pages/GenerateButton";

const layer = new Konva.Layer();

const TopPage = () => {
  let initialImageState, initialStageWidth, initialStageHeight;
  if (process.browser) {
    initialImageState = new window.Image();
    initialImageState.src = "shuchusen.png";
    initialStageWidth = (window.innerWidth * 0.7) as number;
    initialStageHeight = (initialStageWidth * 0.525) as number;
    if (initialStageWidth > 1000) {
      initialStageWidth = 600;
      initialStageHeight = 315;
    }
  }
  const router = useRouter();

  const [text, setText] = useRecoilState(textState);
  const [color, setColor] = useState("#121212");
  const [fontSize, setFontSize] = useState<number>(30);
  const [stageSize, setStageSize] = useState({
    width: initialStageWidth,
    height: initialStageHeight,
  });
  const [image, setImage] = useState<HTMLImageElement | undefined>(
    initialImageState
  );
  const stageRef = useRef(null);

  useEffect(() => {
    const checkSize = () => {
      const width = window.innerWidth * 0.7;
      const height = width * 0.525;
      setStageSize({ width: width, height: height });
      layer.draw();
    };
    window.addEventListener("resize", checkSize);
    return function cleanup() {
      window.removeEventListener("resize", checkSize);
    };
  });

  const submit = async () => {
    const uuid = generateUUID();
    const pixelRatio = stageSize.width! < 400 ? 3 : 2;
    //@ts-ignore
    const dataURL = await stageRef.current.toDataURL({
      pixelRatio: pixelRatio,
    });
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

  const changeKeyword = (keyword: string) => {
    const leftParenPos = text.indexOf("【");
    const rightParenPos = text.indexOf("】");
    if (leftParenPos !== -1 && rightParenPos !== -1) {
      const keywordPos = text.substring(leftParenPos, rightParenPos + 1);
      setText(text.replace(keywordPos, `【${keyword}】`));
    } else {
      setText(`【${keyword}】\n${text}`);
    }
  };

  return (
    <Layout>
      <Box m={5}>
        <Box textAlign="center">
          <Info />
          <TextArea text={text} setText={setText} />
          <Keyword changeKeyword={changeKeyword} />
          <BgImage changeImage={changeImage} />
          <FontColor color={color} setColor={setColor} />
          <FontSize setFontSize={setFontSize} />
        </Box>
        <Canvas
          stageSize={stageSize}
          stageRef={stageRef}
          image={image}
          text={text}
          fontSize={fontSize}
          color={color}
        />
        <GenerateButton submit={submit} />
      </Box>
    </Layout>
  );
};

export default TopPage;
