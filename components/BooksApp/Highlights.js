import React, { useState, useEffect } from "react";
import styled from "styled-components";

const HighlightsWrapper = styled.div`
  padding: var(--spacing-lg) var(--spacing-lg);
`;

const BookHeading = styled.div``;

const BookTitle = styled.h1``;
const BookAuthors = styled.div``;

const Section = styled.div`
  margin-bottom: var(--spacing-2xl);
`;
const SectionTitle = styled.h2`
  margin-top: var(--spacing-md);
`;
const HighlightsList = styled.div``;

const Highlight = styled.div`
  margin-top: var(--spacing-md);
`;
const HighlightContent = styled.p`
  margin-bottom: 0;
`;
const HighlightMeta = styled.div`
  margin-top: var(--spacing-2xs);
  color: var(--light-text-color);

  span {
    margin-right: var(--spacing-sm);
  }
`;

export const Highlights = ({ data }) => {
  const [book, setBook] = useState(data);

  useEffect(() => setBook(data), [data]);

  const bookNotes = book.sections.map((section, i) => {
    const highlights = section.highlights.map((highlight, i) => {
      return (
        <Highlight key={`hl-${i}`}>
          <HighlightContent>{highlight.content}</HighlightContent>
          <HighlightMeta>
            <span>{highlight.type}</span>
            <span>Page: {highlight.page}</span>
            <span>Location: {highlight.location}</span>
          </HighlightMeta>
        </Highlight>
      );
    });

    return (
      <Section key={`s-${i}`}>
        <SectionTitle>{section.title}</SectionTitle>
        {highlights}
      </Section>
    );
  });

  return (
    <HighlightsWrapper>
      <BookHeading>
        <BookTitle>{book.title}</BookTitle>
        <BookAuthors>{book.authors}</BookAuthors>
      </BookHeading>

      <HighlightsList>{bookNotes}</HighlightsList>
    </HighlightsWrapper>
  );
};
