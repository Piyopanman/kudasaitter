import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";

type Props = {
  children?: ReactNode;
  title?: string;
  description?: string;
  image?: string;
};

const Layout = ({
  children,
  title = "くださいったー",
  description = "欲しいものを画像で生成してフォロワーにシェアしよう！",
  image = "https://kudasaitter.vercel.app/default.png",
}: Props) => (
  <Box
    h="100%"
    minH="100vh"
    position="relative"
    paddingBottom="6em"
    bgColor="white"
  >
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={`${description}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hiyoko_coder" />
      <meta name="twitter:creator" content="@hiyoko_coder" />
      <meta name="twitter:image" content={image} />
      <meta property="og:url" content="https://kudasaitter.vercel.app/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <link rel="icon" href="/favicon.png" />
    </Head>
    <Header />
    {children}
    <Footer />
  </Box>
);

export default Layout;
