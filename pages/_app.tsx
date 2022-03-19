import type { AppProps } from "next/app";

import Head from "next/head";
import { RecoilRoot } from "recoil";
import { BrandingProvider } from "@/features/theme";
import { AppHeader } from "@/features/header";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <BrandingProvider>
        <Head>
          <title>mooc helper</title>
          <meta name="referrer" content="no-referrer" />
          <meta name="description" content="mooc helper" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <AppHeader />
        <main>
          <Component {...pageProps} />
        </main>
      </BrandingProvider>
    </RecoilRoot>
  );
}

export default MyApp;
