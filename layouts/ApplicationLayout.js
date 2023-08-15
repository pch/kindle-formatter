import React from "react";
import { PageWrapper, GlobalStyles } from "components/Layout";
import { PageHeader } from "components/Page";

export default function ApplicationLayout({ children }) {
  return (
    <PageWrapper>
      <GlobalStyles />

      <PageHeader />

      <main>{children}</main>
    </PageWrapper>
  );
}
