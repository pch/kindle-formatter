import styled from "styled-components";

export const BookAppWrapper = styled.div`
  min-height: calc(100vh - var(--header-height));
  max-height: calc(100vh - var(--header-height));
  padding: 0;
  min-width: 800px;
  max-width: 100%;
  margin: 0 auto;

  display: grid;
  grid-template-areas: "instructions highlights export";
  grid-template-columns: minmax(150px, 300px) minmax(200px, 1fr) minmax(
      300px,
      1fr
    );
  grid-template-rows: 1fr;

  font-size: var(--text-xs);
`;

const Area = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;

  & > * {
    width: 100%;
  }
`;

export const InstructionsArea = styled(Area)`
  grid-area: instructions;
  border-right: 1px var(--border-color) solid;
`;

export const HighlightsArea = styled(Area)`
  grid-area: highlights;
  border-right: 1px var(--border-color) solid;
`;

export const ExportArea = styled(Area)`
  grid-area: export;
`;

export const AreaTitle = styled.div`
  font-weight: 600;
  border-bottom: 1px var(--border-color) solid;
  text-align: left;
  padding: var(--spacing-md) var(--spacing-lg);
  background: var(--light-indigo-1);
  z-index: 100;
`;

export const AreaContent = styled.div`
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  position: relative;
  flex: 1;
`;
