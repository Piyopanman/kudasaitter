import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";

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
  image = "まだ",
}: Props) => (
  <div>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content={`${description}`} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hiyoko_coder" />
      <meta name="twitter:creator" content="@hiyoko_coder" />
      <meta property="og:url" content="https://kudasaitter.vercel.app/" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* これ絶対パスに修正↓ */}
      <meta property="og:image" content={image} />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <Header />
    {children}
  </div>
);

export default Layout;
