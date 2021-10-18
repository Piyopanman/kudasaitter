import dynamic from "next/dynamic";

const TopPageWithNoSSR = dynamic(() => import("../components/TopPage"), {
  ssr: false,
});
const TopPage = () => {
  return <TopPageWithNoSSR />;
};

export default TopPage;
