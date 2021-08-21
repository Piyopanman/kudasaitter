import { NextPage } from "next";
import { Center, Button } from "@chakra-ui/react";

type Props = {
  submit: () => Promise<void>;
  isLoading: boolean;
};

const GenerateButton: NextPage<Props> = ({ submit, isLoading }) => {
  return (
    <Center>
      <Button my={10} onClick={submit} size="lg" isLoading={isLoading}>
        生成する！！
      </Button>
    </Center>
  );
};

export default GenerateButton;
