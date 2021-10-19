import React from "react";
import { NextPage } from "next";
import Link from "next/link";
import { Center, Heading } from "@chakra-ui/layout";

const Header: NextPage = React.memo(() => {
  return (
    <Center backgroundColor="purple.600" p={8}>
      <Heading s="h2" size="2xl" color="orange.200">
        <Link href="/"> くださいったー🎃</Link>
      </Heading>
    </Center>
  );
});

export default Header;
