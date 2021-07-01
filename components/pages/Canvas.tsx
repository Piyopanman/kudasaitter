import { NextPage } from "next";
import { Center } from "@chakra-ui/react";
import { Stage, Layer, Image as Img, Text } from "react-konva";

type Props = {
  stageSize: {
    width: number | undefined;
    height: number | undefined;
  };
  stageRef: React.MutableRefObject<null>;
  image: CanvasImageSource | undefined;
  text: string;
  fontSize: number;
  color: string;
};

const Canvas: NextPage<Props> = ({
  stageSize,
  stageRef,
  image,
  text,
  fontSize,
  color,
}) => {
  return (
    <Center mt={10} p={3}>
      <Stage width={stageSize.width} height={stageSize.height} ref={stageRef}>
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
  );
};

export default Canvas;
