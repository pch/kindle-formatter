import React from "react";
import styled from "styled-components";
import { PrimaryButton } from "components/Button";
import { CustomPresetArea, AreaTitle, AreaContent } from "./BookAppStyles";

const CustomPresetSection = styled.div`
  padding: var(--spacing-lg);

  input[type="file"] {
    display: none;
  }

  ol {
    margin: 0;
    margin-bottom: var(--spacing-xl);
    padding: var(--spacing-sm);
  }

  ${PrimaryButton} {
    display: block;
  }

  textarea {
    border: 1px var(--border-color) solid;
    padding: var(--spacing-sm);
    display: block;
    margin: var(--spacing-lg) 0;
    width: 100%;
    font-family: var(--font-family-monospace);
    line-height: var(--line-height);
    outline: none;
  }
`;

export const CustomPreset = ({
  customTemplate,
  onPresetUpdate,
  onPresetReset,
}) => {
  return (
    <CustomPresetArea>
      <AreaTitle>Custom Preset Template</AreaTitle>

      <AreaContent>
        <CustomPresetSection>
          <p>
            You can customize the output with your own template (uses{" "}
            <a href="https://github.com/janl/mustache.js">mustache.js</a>{" "}
            syntax):
          </p>

          <textarea
            rows="13"
            value={customTemplate}
            onChange={(e) => onPresetUpdate(e.target.value)}
          ></textarea>

          <PrimaryButton onClick={onPresetReset}>Restore default</PrimaryButton>
        </CustomPresetSection>
      </AreaContent>
    </CustomPresetArea>
  );
};
