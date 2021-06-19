import { useState, useRef } from "react";
import React from "react";
import { Stage, Layer, Image as Img, Text } from "react-konva";
import Konva from "konva";
import Image from "next/image";
import { useRouter } from "next/router";

import Layout from "../components/Layout";
import { generateUUID } from "../utils/generateUUID";
import { saveOgp } from "../repository/saveOgp";
import {
  Box,
  Center,
  Textarea,
  FormControl,
  FormLabel,
  Button,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const layer = new Konva.Layer();

const TopPage = () => {
  let initialImageState;
  if (process.browser) {
    initialImageState = new window.Image();
    initialImageState.src = "shuchusen.png";
  }
  const router = useRouter();
  const imageArray = ["hukidashi.png", "kouhaku.png", "shuchusen.png"];

  const [moji, setMoji] = useState<string>("5000兆円欲しい！！！");
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
        <FormControl textAlign="center">
          <Box>
            <FormLabel textAlign="center" mt={10}>
              文字を入力してください
            </FormLabel>
            <Textarea
              placeholder="(例)5000兆円欲しい！！！"
              width="70%"
              value={moji}
              onChange={(e) => setMoji(e.target.value)}
              isRequired
            />
          </Box>
          <Box>
            <FormLabel textAlign="center" mt={10}>
              背景画像を選んでください
            </FormLabel>
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {imageArray.map((image, index) => (
                <GridItem>
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
            <FormLabel textAlign="center" mt={10}>
              文字のサイズを選んでください
            </FormLabel>
            <Slider
              width="70%"
              size="md"
              onChangeEnd={(val) => setFontSize(val)}
              defaultValue={40}
              min={5}
              max={150}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>

          <Button my={10} onClick={submit}>
            生成する
          </Button>
        </FormControl>
        <Center>
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
        </Center>
      </Box>
    </Layout>
  );
};

export default TopPage;
