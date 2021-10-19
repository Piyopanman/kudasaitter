import { NextPage } from "next";
import Image from "next/image";
import { Box, Text, Grid, GridItem, Tag } from "@chakra-ui/react";
import { imageArray } from "../../constant/imageArray";

type Props = {
  changeImage: (imageUrl: string) => void;
};

const BgImage: NextPage<Props> = ({ changeImage }) => {
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
            borderColor="purple.400"
            position="relative"
            _hover={{
              bgColor: "purple.600",
            }}
          >
            {image === "halloween.jpg" ? (
              <Tag position="absolute" top="2" zIndex="1" colorScheme="orange">
                期間限定👻
              </Tag>
            ) : image === "tokyo2020.png" ? (
              <Tag position="absolute" top="2" zIndex="1" colorScheme="blue">
                TOKYO2020
              </Tag>
            ) : (
              <></>
            )}

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
