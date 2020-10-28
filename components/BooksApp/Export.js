import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { bookToMarkdown } from "lib/services";

const ExportWrapper = styled.div`
  position: relative;
  height: 80vh;
`;

const TextArea = styled.textarea`
  display: block;
  position: absolute;
  left: var(--spacing-lg);
  right: var(--spacing-lg);
  top: var(--spacing-lg);
  bottom: var(--spacing-lg);
  width: calc(100% - var(--spacing-lg) - var(--spacing-lg));
  border: 1px var(--border-color) solid;
  padding: var(--spacing-md);
  line-height: var(--line-height);
`;

export const Export = ({ data }) => {
  const [markdown, setMarkdown] = useState("");

  useEffect(() => {
    setMarkdown(bookToMarkdown(data));
  }, [data]);

  return (
    <ExportWrapper>
      <TextArea defaultValue={markdown}></TextArea>
    </ExportWrapper>
  );
};
