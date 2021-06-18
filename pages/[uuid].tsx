import firebase from "firebase/app";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { TwitterShareButton, TwitterIcon } from "react-share";
import Layout from "../components/Layout";
import { firebaseConfig } from "../firebase";

type Props = {
  uuid: string;
};

const Result: NextPage<Props> = (props) => {
  const { uuid } = props;

  useEffect(() => {
    const getUrl = async () => {
      if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
      }
    };
    getUrl();
  }, []);

  return (
    <Layout image={`${process.env.NEXT_PUBLIC_OGP_BASE_URL}/${uuid}`}>
      <h1>画像を生成しました！！！</h1>
      <Image
        src={`${process.env.NEXT_PUBLIC_OGP_BASE_URL}/${uuid}`}
        width={600}
        height={315}
      />
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
