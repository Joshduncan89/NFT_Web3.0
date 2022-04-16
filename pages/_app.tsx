import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider, ChainId } from "@thirdweb-dev/react";
import { RecoilRoot } from "recoil";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <ThirdwebProvider desiredChainId={ChainId.Rinkeby}>
        <Component {...pageProps} />
      </ThirdwebProvider>
    </RecoilRoot>
  );
}

export default MyApp;
