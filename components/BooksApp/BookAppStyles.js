import styled from "styled-components";

export const BookAppWrapper = styled.div`
  min-height: calc(100vh - var(--header-height));
  max-height: calc(100vh - var(--header-height));
  padding: 0;
  min-width: 800px;
  max-width: 100%;
  margin: 0 auto;

  display: grid;
  grid-template-areas: "books highlights export";
  grid-template-columns: minmax(150px, 300px) minmax(200px, 1fr) minmax(
      300px,
      1fr
    );
  grid-template-rows: 1fr;

  font-size: var(--text-xs);

  position: relative;
`;

export const BooksArea = styled.div`
  grid-area: books;
  height: calc(100vh - var(--header-height));
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  position: relative;
  border-right: 1px var(--border-color) solid;
`;

export const HighlightsArea = styled.div`
  grid-area: highlights;
  border-right: 1px var(--border-color) solid;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  position: relative;
`;

export const ExportArea = styled.div`
  border-right: 1px var(--border-color) solid;
  overflow-y: auto;
  -ms-overflow-style: -ms-autohiding-scrollbar;
  grid-area: export;
  position: relative;
`;

export const AreaTitle = styled.div`
  font-weight: 600;
  border-bottom: 1px var(--border-color) solid;
  text-align: left;
  padding: var(--spacing-md) var(--spacing-lg);
  position: sticky;
  top: 0;
  background: var(--background-color);
  z-index: 100;
`;
