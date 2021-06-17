import type { AppProps } from "next/app";
import firebase from "firebase/app";
import "firebase/storage";
import { useEffect } from "react";
import { RecoilRoot } from "recoil";
import { firebaseConfig } from "../firebase";

function MyApp({ Component, pageProps }: AppProps) {
  //firebase設定初期化
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  );
}

export default MyApp;
