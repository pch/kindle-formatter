import React from "react";
import styled from "styled-components";
import { PrimaryButton } from "components/Button";
import { InstructionsArea, AreaTitle, AreaContent } from "./BookAppStyles";

const InstructionsSection = styled.div`
  padding: var(--spacing-lg);

  input[type="file"] {
    display: none;
  }

  a {
    display: block;
  }

  ol {
    margin: 0;
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-sm);
  }
`;

export const Instructions = ({ onFile }) => {
  const handleFile = (event) => {
    onFile(event.target.files[0], () => {});
  };

  return (
    <InstructionsArea>
      <AreaTitle>Instructions</AreaTitle>

      <AreaContent>
        <InstructionsSection>
          <ol>
            <li>Open Kindle Desktop</li>
            <li>
              Right-click on the book you want to export, click "Go to Notebook"
            </li>
            <li>Click "Export" in the right-hand upper corner</li>
            <li>Save file on your disk</li>
            <li>
              Drag the html file onto this window or use the button below.
            </li>
            <li>Copy Markdown from the right column to Roam.</li>
          </ol>

          <label>
            <input
              name="imagefile"
              type="file"
              accept="text/html"
              onChange={handleFile}
            />
            <PrimaryButton>Browse files</PrimaryButton>
          </label>
        </InstructionsSection>
      </AreaContent>
    </InstructionsArea>
  );
};
