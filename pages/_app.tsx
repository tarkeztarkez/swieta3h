import "../styles/globals.css";
import type { AppProps } from "next/app";

import "dayjs/locale/pl";
import dayjs from "dayjs";

dayjs().locale();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
