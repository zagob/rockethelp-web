import type { AppProps } from "next/app";
import { UserProvider } from "../contexts/ContextProviderUser";
import { RouterParamProvider } from "../contexts/ContextRouterParam";

import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <RouterParamProvider>
        <Component {...pageProps} />
      </RouterParamProvider>
    </UserProvider>
  );
}

export default MyApp;
