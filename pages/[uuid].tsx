import firebase from "firebase/app";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";
import Layout from "../components/Layout";
import { firebaseConfig } from "../firebase";
import { useRecoilValue } from "recoil";
import { ogpUrlState } from "../recoil/atoms/ogpUrl";

type Props = {
  uuid: string;
};

const Result: NextPage<Props> = (props) => {
  const { uuid } = props;
  const ogpUrl = useRecoilValue(ogpUrlState);

  useEffect(() => {
    const getUrl = async () => {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    };
    getUrl();
  }, []);

  return (
    <Layout image={ogpUrl}>
      <h1>画像を生成しました！！！</h1>
      <Image src={ogpUrl} width={600} height={315} />
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
