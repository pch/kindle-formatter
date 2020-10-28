import styled from "styled-components";

export const Button = styled.a`
  cursor: pointer;
  background: transparent;
  border: thin transparent solid;
  color: var(--button-color) !important;
  outline: none;
  padding: var(--button-padding);
  border-radius: var(--button-border-radius);
  text-align: center;
  user-select: none;
  font-size: var(--text-sm);

  width: ${(props) => (props.fullWidth ? "100%" : "auto")};
  display: ${(props) => (props.fullWidth ? "block" : "inline-block")};
`;

export const PrimaryButton = styled(Button)`
  cursor: pointer;
  background-color: var(--button-bg);
  /* border: 2px rgba(113, 67, 142, 1) solid; */
  color: var(--button-color) !important;
  outline: none;
  border-radius: var(--button-border-radius);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: var(--button-bg-hover);
  }
`;

export const SecondaryButton = styled(Button)`
  cursor: pointer;
  background-color: var(--button-bg-secondary);
  color: var(--button-color) !important;
  outline: none;
  border-radius: var(--button-border-radius);
  transition: all 0.3s ease-in-out;

  &:hover {
    background: var(--indigo-3);
  }
`;
