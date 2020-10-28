import React from "react";
import Head from "next/head";
import ApplicationLayout from "layouts/ApplicationLayout";
import { APP_CONFIG } from "appConfig";
import { BooksApp } from "components/BooksApp";

export default function Home() {
  return (
    <ApplicationLayout>
      <Head>
        <title>{APP_CONFIG.siteTitle}</title>
        <meta property="og:title" content={APP_CONFIG.siteTitle} />
        <meta name="description" content={APP_CONFIG.siteDescription} />
        <meta property="og:description" content={APP_CONFIG.siteDescription} />
      </Head>

      <BooksApp />
    </ApplicationLayout>
  );
}
