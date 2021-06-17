import firebase from "firebase/app";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";
import { getOgpUrl } from "../repository/getOgpUrl";
import Layout from "../components/Layout";
import { firebaseConfig } from "../firebase";

type Props = {
  uuid: string;
};

const Result: NextPage<Props> = (props) => {
  const { uuid } = props;
  // const [ogp, setOgp] = useState("/muji.png");
  const [ogp, setOgp] = useState(
    "https://firebasestorage.googleapis.com/v0/b/kudasaitter.appspot.com/o/wxwsj9fo?alt=media&token=adc28e7a-8c3a-4622-ad62-740f1a342d9e"
  );

  useEffect(() => {
    const getUrl = async () => {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
      const path = (await getOgpUrl(uuid)) as string;
      setOgp(path);
    };
    getUrl();
  }, []);

  return (
    <Layout image={ogp}>
      <h1>画像を生成しました！！！</h1>
      <Image src={ogp} width={600} height={315} />
      <TwitterShareButton
        title="くださいったー"
        hashtags={["くださいったー"]}
        related={["hiyoko_coder"]}
        url={`https://kudasaitter.vercel.app/${uuid}`}
      >
        <TwitterIcon />
      </TwitterShareButton>
      <Link href="/">もう一度画像を作る！</Link>
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
