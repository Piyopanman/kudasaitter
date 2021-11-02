import { useState, useEffect, useRef } from "react";
import React from "react";
import { useRouter } from "next/router";
import "react-color-palette/lib/css/styles.css";
import textState from "../recoil/atoms/textState";
import { Box } from "@chakra-ui/react";
import { useRecoilState } from "recoil";
import Layout from "./Layout";
import Info from "./pages/Info";
import Keyword from "./pages/Keyword";
import { generateUUID } from "../utils/generateUUID";
import { saveOgp } from "../repository/saveOgp";
import FontColor from "./pages/FontColor";
import TextArea from "./pages/TextArea";
import BgImage from "./pages/BgImage";
import FontSize from "./pages/FontSize";
import Canvas from "./pages/Canvas";
import GenerateButton from "./pages/GenerateButton";

const TopPageWithNoSSR = () => {
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
  const [isLoading, setLoading] = useState(false);
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
    };
    window.addEventListener("resize", checkSize);
    return function cleanup() {
      window.removeEventListener("resize", checkSize);
    };
  });

  const submit = async () => {
    setLoading(true);
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
        <GenerateButton submit={submit} isLoading={isLoading} />
      </Box>
    </Layout>
  );
};

export default TopPageWithNoSSR;
