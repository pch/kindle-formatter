import React, { useState } from "react";
import { Instructions } from "./Instructions";
import { Highlights } from "./Highlights";
import { Export } from "./Export";
import Dropzone from "./Dropzone";
import { BookAppWrapper } from "./BookAppStyles";
import { parseHighlights } from "lib/parser";

const emptyBook = { title: "", authors: "", sections: [], empty: true };

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
        <Instructions onFile={handleFile} />
        <Highlights book={book} />
        <Export book={book} />
      </BookAppWrapper>
    </Dropzone>
  );
};
