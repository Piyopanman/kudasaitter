import { NextPage } from "next";
import { Box, Text, Grid, GridItem, Button } from "@chakra-ui/react";
import { keywordArray } from "../../constant/keywordArray";

type Props = {
  changeKeyword: (keyword: string) => void;
};

const Keyword: NextPage<Props> = ({ changeKeyword }) => {
  return (
    <Box w="70%" my={0} mx="auto">
      <Text textAlign="center" fontSize="xl" mt={10}>
        キーワードを選んでください（任意）
      </Text>
      <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={1}>
        {keywordArray.map((keyword, index) => (
          <GridItem cursor="pointer" p={1}>
            <Button onClick={() => changeKeyword(keyword)} key={index}>
              {keyword}
            </Button>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Keyword;
