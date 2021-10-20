import { NextPage } from "next";
import {
  Box,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";

type Props = {
  setFontSize: React.Dispatch<React.SetStateAction<number>>;
};

const FontSize: NextPage<Props> = ({ setFontSize }) => {
  return (
    <Box>
      <Text textAlign="center" fontSize="xl" mt={10}>
        文字のサイズを選んでください
      </Text>
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
          <SliderFilledTrack bg="blue.200" />
        </SliderTrack>
        <SliderThumb boxSize="7" bg="gray.50">
          🎃
        </SliderThumb>
      </Slider>
    </Box>
  );
};

export default FontSize;
