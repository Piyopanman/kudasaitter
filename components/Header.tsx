import { NextPage } from "next";
import { Center, Heading } from "@chakra-ui/layout";

const Header: NextPage = () => {
  return (
    <Center backgroundColor="blue.100" p={8}>
      <Heading s="h2" size="2xl">
        くださいったー
      </Heading>
    </Center>
  );
};

export default Header;
