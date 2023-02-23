import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

type MyAppProps = AppProps<{
  dehydratedState: unknown;
}>;

function MyApp({ Component, pageProps }: MyAppProps) {
  const [queryClient] = React.useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <Head>
            <title>Comments Feed</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp;
