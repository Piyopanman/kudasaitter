import type { AppProps } from "next/app";
import firebase from "firebase";
import { useEffect } from "react";
import { firebaseConfig } from "../firebase";

function MyApp({ Component, pageProps }: AppProps) {
  //firebase設定初期化
  useEffect(() => {
    firebase.initializeApp(firebaseConfig);
  }, []);
  // firebase.initializeApp(firebaseConfig);
  // const strage = firebase.storage();

  return <Component {...pageProps} />;
}

export default MyApp;
