import { NextPage } from "next";
import { Box, Text, Textarea } from "@chakra-ui/react";

type Props = {
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
};

const TextArea: NextPage<Props> = ({ text, setText }) => {
  return (
    <Box>
      <Text textAlign="center" fontSize="xl" mt={10}>
        文字を入力してください(改行、絵文字使用可)
      </Text>
      <Textarea
        placeholder="(例)5000兆円欲しい！！！"
        width="70%"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </Box>
  );
};

export default TextArea;
