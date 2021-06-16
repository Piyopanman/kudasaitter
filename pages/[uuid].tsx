import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getOgpUrl } from "../repository/getOgpUrl";
import Layout from "../components/Layout";

type Props = {
  uuid: string;
};

const Result: NextPage<Props> = (props) => {
  const { uuid } = props;
  const [ogp, setOgp] = useState("/muji.png");

  useEffect(() => {
    const getUrl = async () => {
      const path = (await getOgpUrl(uuid)) as string;
      setOgp(path);
    };
    getUrl();
  }, []);

  return (
    <Layout image={ogp}>
      <h1>画像を生成しました！！！</h1>
      <Image src={ogp} width={600} height={315} />
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
