import React, { useState } from "react";
import { Instructions } from "./Instructions";
import { Highlights } from "./Highlights";
import { Export } from "./Export";
import Dropzone from "./Dropzone";
import {
  BookAppWrapper,
  BooksArea,
  ExportArea,
  HighlightsArea,
  AreaTitle,
} from "./BookAppStyles";
import { parseHighlights } from "lib/services";

const emptyBook = { title: null, authors: "", sections: [] };

export const BooksApp = () => {
  const [book, setBook] = useState(emptyBook);

  const handleFile = async (file, callback) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      setBook(parseHighlights(e.target.result));
    };
    reader.readAsText(file);

    callback();
  };

  return (
    <Dropzone
      onFileDrop={handleFile}
      allowedMimeTypes={["text/html"]}
      disallowedFileTypeMsg="Only HTML files are allowed"
    >
      <BookAppWrapper>
        <BooksArea>
          <AreaTitle>Instructions</AreaTitle>

          <Instructions onFile={handleFile} />
        </BooksArea>

        <HighlightsArea>
          <AreaTitle>Highlights and Notes</AreaTitle>
          <Highlights data={book} />
        </HighlightsArea>

        <ExportArea>
          <AreaTitle>Plain text</AreaTitle>
          <Export data={book} />
        </ExportArea>
      </BookAppWrapper>
    </Dropzone>
  );
};
