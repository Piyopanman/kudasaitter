import type { AppProps } from "next/app";
import firebase from "firebase";
import "firebase/storage";
import { useEffect } from "react";
import { firebaseConfig } from "../firebase";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import { halloweenTheme } from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  //firebase設定初期化
  useEffect(() => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }, []);

  return (
    <RecoilRoot>
      <ChakraProvider theme={halloweenTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
