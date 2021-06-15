import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { getOgpUrl } from "../repository/getOgpUrl";

type Props = {
  uuid: string;
};

const Result: NextPage<Props> = (props) => {
  const { uuid } = props;
  const [ogp, setOgp] = useState("/ogp01.png");

  useEffect(() => {
    const getUrl = async () => {
      const path = (await getOgpUrl(uuid)) as string;
      setOgp(path);
    };
    getUrl();
  }, []);

  return (
    <div>
      <h1>uuidは　{uuid}　ですよ！</h1>
      <h1>画像を生成しました！</h1>
      <img src={ogp} />
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
