import { useState, useEffect, useRef } from "react";
import React from "react";
import { Stage, Layer, Image as Img, Text } from "react-konva";
import Konva from "konva";
import Image from "next/image";
import { useRouter } from "next/router";
import "react-color-palette/lib/css/styles.css";
import { HexColorPicker } from "react-colorful";

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
  const imageArray = [
    "hukidashi.png",
    "kouhaku.png",
    "kouhaku02.jpeg",
    "shuchusen.png",
    "muji.png",
  ];
  const keywordArray = [
    "募集中",
    "たくさん欲しい",
    "不足しています",
    "急募",
    "実は持ってるでしょ？",
    "あなたの知識が必要です",
    "求ム！有識者！",
    "救われる命があります",
    "助けてください",
    "人類には必要です",
    "助けて",
    "今こそ解き放つ時",
    "隠し持っていませんか？",
    "私の必須栄養素",
    "持っているのは知っています",
    "お恵みを...",
    "みんなも欲しいはず",
    "黙って寄越せ",
  ];

  const [text, setText] = useRecoilState(textState);
  const [color, setColor] = useState("#121212");
  const [fontSize, setFontSize] = useState<number>(30);
  const [stageSize, setStageSize] = useState({
    width: initialStageWidth,
    height: initialStageHeight,
  });
  const [image, setImage] =
    useState<HTMLImageElement | undefined>(initialImageState);
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
          <Box>
            <T textAlign="center" fontSize="xl" mt={10}>
              文字を入力してください(改行、絵文字使用可)
            </T>
            <Textarea
              placeholder="(例)5000兆円欲しい！！！"
              width="70%"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Box>

          <Box w="70%" my={0} mx="auto">
            <T textAlign="center" fontSize="xl" mt={10}>
              キーワードを選んでください（任意）
            </T>
            <Grid
              templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
              gap={1}
            >
              {keywordArray.map((keyword, index) => (
                <GridItem cursor="pointer" p={1}>
                  <Button onClick={() => changeKeyword(keyword)} key={index}>
                    {keyword}
                  </Button>
                </GridItem>
              ))}
            </Grid>
          </Box>

          <Box w="70%" my={0} mx="auto">
            <T textAlign="center" fontSize="xl" mt={10}>
              背景画像を選んでください
            </T>
            <Grid
              templateColumns="repeat(auto-fit, minmax(200px, 1fr))"
              gap={2}
            >
              {imageArray.map((image, index) => (
                <GridItem
                  cursor="pointer"
                  p={1}
                  border="4px"
                  borderColor="blue.200"
                  _hover={{
                    bgColor: "blue.100",
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
              文字色を選んでください
            </T>
            <Center>
              <HexColorPicker color={color} onChange={setColor} />
            </Center>
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
              defaultValue={30}
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

        <Center mt={10} p={3}>
          <Stage
            width={stageSize.width}
            height={stageSize.height}
            ref={stageRef}
          >
            <Layer>
              <Img
                image={image}
                width={stageSize.width}
                height={stageSize.height}
              />
              <Text
                text={text}
                fontSize={fontSize}
                fill={color}
                fontStyle="bold"
                align="center"
                verticalAlign="middle"
                x={stageSize.width! / 12}
                y={stageSize.height! / 21}
                strokeWidth={10}
                wrap="char"
                height={stageSize.height! * 0.9}
                width={stageSize.width! * 0.85}
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
