import Mustache from "mustache";

// Disable escaping
Mustache.escape = function (text) {
  return text;
};

export const formatOutput = (book, template) => {
  try {
    const output = Mustache.render(template.trim(), book);
    return output;
  } catch (error) {
    console.log(error);
    return `Invalid template: ${error.message}`;
  }
};
