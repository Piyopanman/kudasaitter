import { NextPage } from "next";
import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  Box,
} from "@chakra-ui/react";

const Info: NextPage = React.memo(() => {
  return (
    <Box w="85%" my={0} mx="auto">
      <Accordion allowMultiple>
        <AccordionItem>
          <AccordionButton
            textAlign="center"
            bgColor="purple.600"
            _hover={{ bgColor: "purple.50" }}
          >
            <Box my={0} mx="auto" color="orange.200">
              遊び方
              <AccordionIcon />
            </Box>
          </AccordionButton>
          <AccordionPanel>
            <Text textAlign="left">
              「ネコチャンの写真ください！」「【急募】トイレットペーパー」など欲しいものを記入&ツイートしてフォロワーに知らせましょう！
              <br />
              <br />
              また、「くださいったー」という名前ですが「OOください！」のような使い方をしないで全く構いません！
              <br />
              「今日も推しが尊い！！！！」「ねむい！！！」「全オタクCeles推し活をしよう！！」などなど自由に使っていただけると嬉しいです！
              <br />
              <br />
              「『可愛い推しください！！』という主張をどうにかTLで目立たせたい」という気持ちから開発したアプリなので、「くださいったー」という名前はその名残、くらいの認識でお願いできればと思います🙇‍♂️
              <br />
              <br />
              たくさん使ってくださいね〜！
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  );
});

export default Info;
