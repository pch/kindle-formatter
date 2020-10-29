import Mustache from "mustache";
import { TEMPLATES } from "templates";

// Disable escaping
Mustache.escape = function (text) {
  return text;
};

export const formatOutput = (book, presetTemplate = "roam") => {
  const templateStr = TEMPLATES[presetTemplate].trim();
  const output = Mustache.render(templateStr, book);
  return output;
};
