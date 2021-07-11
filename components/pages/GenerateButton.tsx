import { NextPage } from "next";
import { Center, Button } from "@chakra-ui/react";

type Props = {
  submit: () => Promise<void>;
};

const GenerateButton: NextPage<Props> = ({ submit }) => {
  return (
    <Center>
      <Button my={10} onClick={submit} size="lg">
        生成する！！
      </Button>
    </Center>
  );
};

export default GenerateButton;
