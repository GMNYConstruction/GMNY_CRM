"use client";
import "../app/globals.css";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { StoreProvider } from "@/store/StoreProvider";
import Layout from "@/components/Layout";

const MyApp = ({ Component, pageProps: { session, ...pageProps } }: AppProps) => {
  return (
    <StoreProvider>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </StoreProvider>
  );
};

export default MyApp;
