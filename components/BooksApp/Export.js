import React from "react";
import styled, { css } from "styled-components";
import { ExportArea, AreaTitle, AreaContent } from "./BookAppStyles";
import { formatOutput } from "lib/formatter";

const TextArea = styled.textarea`
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  padding: var(--spacing-lg);
  line-height: var(--line-height);
  border: none;
  outline: none;
  font-family: var(--font-family-monospace);
`;

const PresetsWrapper = styled.div`
  display: flex;
`;

const activeButtonStyles = `
  color: var(--grey-4);

  &:after {
    display: block;
    content: "";
    height: 2px;
    background-color: var(--grey-4);
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
  }
`;

const PresetButton = styled.button`
  margin-left: var(--spacing-sm);
  color: var(--light-text-color);
  position: relative;

  ${(props) =>
    props.active
      ? css`
          ${activeButtonStyles}
        `
      : ""};
`;

const PLACEHOLDER = "Exportable plain-text notes will appear in this column";

export const Export = ({ book, selectedPreset, templates, onPresetChange }) => {
  const output = book.empty
    ? PLACEHOLDER
    : formatOutput(book, templates[selectedPreset]);

  const presets = Object.keys(templates).map((tpl) => {
    return (
      <PresetButton
        active={tpl === selectedPreset}
        onClick={() => onPresetChange(tpl)}
        key={tpl}
      >
        {tpl}
      </PresetButton>
    );
  });

  return (
    <ExportArea>
      <AreaTitle>
        Plain text
        <PresetsWrapper>Preset: {presets}</PresetsWrapper>
      </AreaTitle>
      <AreaContent>
        <TextArea readOnly value={output}></TextArea>
      </AreaContent>
    </ExportArea>
  );
};
