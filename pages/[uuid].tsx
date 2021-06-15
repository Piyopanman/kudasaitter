import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getOgpUrl } from "../repository/getOgpUrl";
import Layout from "../components/Layout";

type Props = {
  uuid: string;
};

const Result: NextPage<Props> = (props) => {
  const { uuid } = props;
  const [ogp, setOgp] = useState("/ogp01.png");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUrl = async () => {
      const path = (await getOgpUrl(uuid)) as string;
      setOgp(path);
      setLoading(false);
    };
    getUrl();
  }, []);

  return (
    <Layout image={ogp}>
      <h1>uuidは　{uuid}　ですよ！</h1>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div>
          <h1>画像を生成しました！</h1>
          <img src={ogp} />
        </div>
      )}
      <Link href="/">トップへ</Link>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { uuid } = context.query;
  return {
    props: { uuid },
  };
};

export default Result;
