import { GetServerSideProps, NextPage } from "next";

type Props = {
  uuid: string;
};

const Result: NextPage<Props> = (props) => {
  const { uuid } = props;
  return (
    <div>
      <h1>uuidは　{uuid}　ですよ！</h1>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uuid } = context.query;
  return {
    props: { uuid },
  };
};

export default Result;
