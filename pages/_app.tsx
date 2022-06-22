import type { AppProps } from "next/app";

import Head from "next/head";
import { RecoilRoot } from "recoil";
import { BrandingProvider } from "@/features/theme";
import browserClient from "@apmplus/web";

browserClient("init", {
  aid: 369721,
});
browserClient("start");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <BrandingProvider>
        <Head>
          <title>mooc helper</title>
          <meta name="referrer" content="no-referrer" />
          <meta
            name="keywords"
            content="mooc helper,查询中国大学MOOC(慕课),单元测验,单元作业答案"
          />
          <meta
            name="description"
            content="查询中国大学MOOC(慕课)单元测验,单元作业答案"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </BrandingProvider>
    </RecoilRoot>
  );
}

export default MyApp;
