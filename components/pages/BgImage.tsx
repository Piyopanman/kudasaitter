import { NextPage } from "next";
import Image from "next/image";
import { Box, Text, Grid, GridItem } from "@chakra-ui/react";
import { imageArray } from "../../constant/imageArray";

type Props = {
  changeImage: (imageUrl: string) => void;
};

const BgImage: NextPage<Props> = ({ changeImage }) => {
  console.log("bgimage");

  return (
    <Box w="70%" my={0} mx="auto">
      <Text textAlign="center" fontSize="xl" mt={10}>
        背景画像を選んでください
      </Text>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={2}>
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
  );
};

export default BgImage;
