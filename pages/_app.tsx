import type { AppProps } from "next/app";

import Head from "next/head";
import { RecoilRoot } from "recoil";
import { BrandingProvider } from "@/features/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <BrandingProvider>
        <Head>
          <title>mooc helper</title>
          <meta name="referrer" content="no-referrer" />
          <meta
            name="keywords"
            content="慕课答案,中国大学慕课答案,中国大学MOOC(慕课)答案,mooc helper"
          />
          <meta
            name="description"
            content="查询中国大学MOOC(慕课)单元测验、单元作业、期中/期末测试答案"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </BrandingProvider>
    </RecoilRoot>
  );
}

export default MyApp;
