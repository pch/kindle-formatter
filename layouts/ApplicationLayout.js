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

        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📚</text></svg>"
        />
      </Head>

      <PageHeader />

      <main>{children}</main>
    </PageWrapper>
  );
}
