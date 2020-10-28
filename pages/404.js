import React from "react";
import Head from "next/head";
import ApplicationLayout from "layouts/ApplicationLayout";
import { APP_CONFIG } from "appConfig";

export default function Custom404() {
  return (
    <ApplicationLayout>
      <Head>
        <title>
          This page doesn't exist (Error 404) | {APP_CONFIG.siteTitle}
        </title>
      </Head>
      This page doesn't exist.
    </ApplicationLayout>
  );
}
