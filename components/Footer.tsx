import { NextPage } from "next";
import React from "react";
import { Box, Heading, Text, Link } from "@chakra-ui/react";

const Footer: NextPage = React.memo(() => {
  return (
    <Box
      textAlign="center"
      mt={10}
      py={5}
      bgColor="purple.600"
      pos="absolute"
      bottom={0}
      h="6em"
      w="100%"
    >
      <Heading size="lg" color="orange.200">
        くださいったー
      </Heading>
      <Text color="orange.200">
        作成者:{" "}
        <Link href="https://twitter.com/hiyoko_coder">@hiyoko_coder</Link>
      </Text>
    </Box>
  );
});

export default Footer;
