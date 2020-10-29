import React from "react";
import Head from "next/head";
import { PageWrapper, GlobalStyles } from "components/Layout";
import { PageHeader } from "components/Page";

export default function ApplicationLayout({ children }) {
  return (
    <PageWrapper>
      <GlobalStyles />
      <Head>
        <meta property="og:type" content="website" />

        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Mono&family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <PageHeader />

      <main>{children}</main>
    </PageWrapper>
  );
}
