import React, { useState, useEffect } from "react";
import { Instructions } from "./Instructions";
import { Highlights } from "./Highlights";
import { Export } from "./Export";
import { CustomPreset } from "./CustomPreset";
import Dropzone from "./Dropzone";
import { BookAppWrapper, Footer } from "./BookAppStyles";
import { parseHighlights } from "lib/parser";
import { TEMPLATES } from "templates";

const emptyBook = { title: "", authors: "", sections: [], empty: true };

const DEFAULT_PRESET = "roam";

export const BooksApp = () => {
  const defaultTemplate = TEMPLATES[DEFAULT_PRESET].trim();
  const [book, setBook] = useState(emptyBook);
  const [presetName, setPresetName] = useState(DEFAULT_PRESET);
  const [customTemplate, setCustomTemplate] = useState(defaultTemplate);

  const templates = { ...TEMPLATES, custom: customTemplate };

  useEffect(() => {
    if (typeof window === "undefined") return;

    setPresetName(
      localStorage.getItem("KINDLE_EXPORT_PRESET") || DEFAULT_PRESET
    );

    setCustomTemplate(
      localStorage.getItem("KINDLE_EXPORT_TPL") || defaultTemplate
    );
  }, [defaultTemplate]);

  const handlePresetChange = (newPreset) => {
    setPresetName(newPreset);
    localStorage.setItem("KINDLE_EXPORT_PRESET", newPreset);
  };

  const handleFile = async (file, callback) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      setBook(parseHighlights(e.target.result));
    };
    reader.readAsText(file);

    callback();
  };

  const handleCustomPresetUpdate = (newValue) => {
    setCustomTemplate(newValue);
    localStorage.setItem("KINDLE_EXPORT_TPL", newValue);
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
        <Export
          book={book}
          selectedPreset={presetName}
          templates={templates}
          onPresetChange={handlePresetChange}
        />
        <CustomPreset
          customTemplate={customTemplate}
          onPresetUpdate={handleCustomPresetUpdate}
          onPresetReset={() => handleCustomPresetUpdate(defaultTemplate)}
        />
        <Footer>
          <div>made by <a href="https://ptrchm.com">ptrchm</a></div>
          <div>see also: <a href="https://pixelpeeper.com/exif-data-viewer">exif data viewer</a></div>
        </Footer>
      </BookAppWrapper>
    </Dropzone>
  );
};
