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
            content="mooc helper,查询中国大学MOOC慕课答案,慕课单元测验,慕课单元作业"
          />
          <meta
            name="description"
            content="查询中国大学MOOC慕课单元测验,单元作业答案"
          />
          <link rel="icon" href="/favicon.ico" />
          <link rel="manifest" href="/static/manifest.json" />
        </Head>
        <Component {...pageProps} />
      </BrandingProvider>
    </RecoilRoot>
  );
}

export default MyApp;
