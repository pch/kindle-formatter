import React from "react";
import styled from "styled-components";
import { ExportArea, AreaTitle, AreaContent } from "./BookAppStyles";
import { bookToMarkdown } from "lib/services";

const TextArea = styled.textarea`
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  padding: var(--spacing-lg);
  line-height: var(--line-height);
  border: none;
  outline: none;
  font-family: var(--font-family-monospace);
`;

export const Export = ({ book }) => {
  const markdown = bookToMarkdown(book);

  return (
    <ExportArea>
      <AreaTitle>Plain text</AreaTitle>
      <AreaContent>
        <TextArea readOnly value={markdown}></TextArea>
      </AreaContent>
    </ExportArea>
  );
};
