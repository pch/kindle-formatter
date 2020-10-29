// Kindle export returns broken html with mismatched closing tags
// This needs to be fixed before we can parse the document.
const fixBrokenHTML = (sourceHTML) => {
  return sourceHTML
    .replaceAll("</h3>", "</div>")
    .replaceAll("</div><div class='noteText'>", "</h3><div class='noteText'>");
};

const highlightType = (text) => {
  return text.startsWith("Highlight") ? "Highlight" : "Note";
};

const extractPageNumber = (text) => {
  const match = text.match(/Page\s+([0-9]+)/);
  if (match) {
    return match[1];
  }
};

const extractLocation = (text) => {
  const match = text.match(/Location\s+([0-9]+)/);
  if (match) {
    return match[1];
  }
};

// For some reason Kindle Export inserts spaces before punctuation, e.g.:
// " this is , an example of a messed up text . "
const cleanUpText = (text) => {
  let newText = text;

  [",", ".", ";", "(", ")", "“"].forEach((mark) => {
    newText = newText.replaceAll(` ${mark}`, mark);
  });

  return newText;
};

export const parseHighlights = (rawHTML) => {
  const fixedHTML = fixBrokenHTML(rawHTML);

  const domparser = new DOMParser();
  const doc = domparser.parseFromString(fixedHTML, "text/html");

  const container = doc.querySelector(".bodyContainer");
  const bookTitle = doc.querySelector(".bookTitle");
  const bookAuthors = doc.querySelector(".authors");

  const nodes = Array.from(container.childNodes);

  const sections = [];
  let currentSection = null;
  let currentHighlight = null;

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      return;
    }

    // Chapter
    if (node.className === "sectionHeading") {
      if (currentSection !== null) {
        sections.push({ ...currentSection });
      }

      currentSection = {
        sectionTitle: node.innerText.trim(),
        highlights: [],
      };
    }

    // Highlight or note heading
    if (node.className === "noteHeading") {
      const heading = node.innerText.trim();

      currentHighlight = {
        type: highlightType(heading),
        page: extractPageNumber(heading),
        location: extractLocation(heading),
        highlight: "",
      };
    }

    if (node.className === "noteText") {
      currentHighlight.highlight = cleanUpText(node.innerText.trim());

      if (currentHighlight !== null) {
        currentSection.highlights.push({ ...currentHighlight });
      }
    }
  });

  if (currentSection !== null) {
    sections.push({ ...currentSection });
  }

  return {
    title: bookTitle.innerText.trim(),
    authors: bookAuthors.innerText.trim(),
    sections: sections,
  };
};
