import { NextPage } from "next";
import { Box, Text, Center } from "@chakra-ui/react";
import { HexColorPicker } from "react-colorful";

type Props = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

const FontColor: NextPage<Props> = ({ color, setColor }) => {
  console.log("fontcolor");
  return (
    <Box>
      <Text textAlign="center" fontSize="xl" mt={10}>
        文字色を選んでください
      </Text>
      <Center>
        <HexColorPicker color={color} onChange={setColor} />
      </Center>
    </Box>
  );
};

export default FontColor;
