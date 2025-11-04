// ========================================
// TEMPLATES
// ========================================

const TEMPLATES = {
  markdown: `
# {{title}}
by {{authors}}

## Highlights and Notes

{{#sections}}
### {{sectionTitle}}

{{#highlights}}
{{highlight}}
**{{type}}** {{#page}}page: {{page}}{{/page}} {{#location}}location: {{location}}{{/location}}

{{/highlights}}
{{/sections}}
`,

  // Roam Research
  roam: `
- Title:: {{title}}
- Authors:: {{authors}}

- **Highlights and Notes**
  {{#sections}}
  - ## {{sectionTitle}}
    {{#highlights}}
    - {{highlight}}
      - **{{type}}** {{#page}}page: {{page}}{{/page}} {{#location}}location: {{location}}{{/location}}
    {{/highlights}}
  {{/sections}}
`,
};

const DEFAULT_PRESET = "markdown";
const EMPTY_BOOK = { title: "", authors: "", sections: [], empty: true };

// ========================================
// PARSER
// ========================================

// Kindle export returns broken html with mismatched closing tags
// This needs to be fixed before we can parse the document.
function fixBrokenHTML(sourceHTML) {
  let fixedHTML = sourceHTML.replace(/(\r\n|\n|\r)/gm, "");
  fixedHTML = fixedHTML.replace("</div></div></h1><hr/>", "</div></h1><hr/>");

  if (!fixedHTML.includes("</h3>")) {
    return fixedHTML;
  }

  return fixedHTML
    .replaceAll("</h3>", "</div>")
    .replaceAll("</div><div class='noteText'>", "</h3><div class='noteText'>");
}

function highlightType(text) {
  const match = text.match(/^(.*)\s-\s/);
  if (match) {
    return match[1];
  }
}

function extractPageNumber(text) {
  const match = text.match(/\s-\s\w*\s+([0-9]+)/);
  if (match) {
    return match[1];
  }
}

function extractLocation(text) {
  const match = text.match(/\s·\s\w*\s+([0-9]+)/);
  if (match) {
    return match[1];
  }
}

// For some reason Kindle Export inserts spaces before punctuation, e.g.:
// " this is , an example of a messed up text . "
function cleanUpText(text) {
  let newText = text;

  [",", ".", ";", "(", ")", "\u201D"].forEach((mark) => {
    newText = newText.replaceAll(` ${mark}`, mark);
  });

  return newText;
}

function parseHighlights(rawHTML) {
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
      const type = highlightType(heading);

      currentHighlight = {
        type: type,
        page: extractPageNumber(heading),
        location: extractLocation(heading),
        highlight: "",
        isNote: type === "Note",
      };
    }

    if (node.className === "noteText") {
      if (!currentHighlight) return;

      currentHighlight.highlight = cleanUpText(node.innerText.trim());

      if (currentHighlight !== null) {
        currentSection = currentSection
          ? currentSection
          : { sectionTitle: "", highlights: [] }; // a section without a sectionHeading
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
}

// ========================================
// FORMATTER
// ========================================

// Disable Mustache escaping
Mustache.escape = function (text) {
  return text;
};

function formatOutput(book, template) {
  try {
    const output = Mustache.render(template.trim(), book);
    return output;
  } catch (error) {
    console.log(error);
    return `Invalid template: ${error.message}`;
  }
}

// ========================================
// STATE
// ========================================

let currentBook = EMPTY_BOOK;
let currentPreset = DEFAULT_PRESET;
let customTemplate = TEMPLATES[DEFAULT_PRESET].trim();

// ========================================
// DOM ELEMENTS
// ========================================

const dropzone = document.getElementById("dropzone");
const dropzoneAlert = document.getElementById("dropzone-alert");
const dropzoneUploading = document.getElementById("dropzone-uploading");
const fileInput = document.getElementById("file-input");
const placeholder = document.getElementById("placeholder");
const bookTitle = document.getElementById("book-title");
const bookAuthors = document.getElementById("book-authors");
const highlightsList = document.getElementById("highlights-list");
const exportOutput = document.getElementById("export-output");
const customTemplateTextarea = document.getElementById("custom-template");
const restoreDefaultBtn = document.getElementById("restore-default");
const presetButtons = document.querySelectorAll(".preset-button");

// ========================================
// UI UPDATES
// ========================================

function renderHighlights(book) {
  if (book.empty) {
    placeholder.style.display = "block";
    bookTitle.textContent = "";
    bookAuthors.textContent = "";
    highlightsList.innerHTML = "";
    return;
  }

  placeholder.style.display = "none";
  bookTitle.textContent = book.title;
  bookAuthors.textContent = book.authors;

  const sectionsHTML = book.sections
    .map((section) => {
      const highlightsHTML = section.highlights
        .map(
          (highlight) => `
        <div class="highlight">
          <p class="highlight-content">${highlight.highlight}</p>
          <div class="highlight-meta">
            <span>${highlight.type}</span>
            ${highlight.page ? `<span>Page: ${highlight.page}</span>` : ""}
            ${highlight.location ? `<span>Location: ${highlight.location}</span>` : ""}
          </div>
        </div>
      `
        )
        .join("");

      return `
        <div class="section">
          <h2 class="section-title">${section.sectionTitle}</h2>
          ${highlightsHTML}
        </div>
      `;
    })
    .join("");

  highlightsList.innerHTML = sectionsHTML;
}

function renderExport() {
  const templates = { ...TEMPLATES, custom: customTemplate };
  const output = currentBook.empty
    ? "Exportable plain-text notes will appear in this column"
    : formatOutput(currentBook, templates[currentPreset]);

  exportOutput.value = output;
}

function updateActivePreset() {
  presetButtons.forEach((btn) => {
    if (btn.dataset.preset === currentPreset) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
}

function render() {
  renderHighlights(currentBook);
  renderExport();
  updateActivePreset();
}

// ========================================
// FILE HANDLING
// ========================================

function handleFile(file) {
  if (!file) return;

  dropzoneUploading.classList.add("active");

  const reader = new FileReader();
  reader.onload = function (e) {
    currentBook = parseHighlights(e.target.result);
    render();
    dropzoneUploading.classList.remove("active");
  };
  reader.readAsText(file);
}

// ========================================
// EVENT HANDLERS
// ========================================

// Drag and Drop
dropzone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropzoneAlert.classList.add("active");
});

dropzone.addEventListener("dragleave", (e) => {
  e.preventDefault();
  dropzoneAlert.classList.remove("active");
});

dropzone.addEventListener("drop", (e) => {
  e.preventDefault();
  dropzoneAlert.classList.remove("active");

  const files = e.dataTransfer.files;
  const file = files[0];

  if (file && file.type !== "text/html") {
    alert("Only HTML files are allowed");
    return;
  }

  handleFile(file);
});

// File Input
fileInput.addEventListener("change", (e) => {
  handleFile(e.target.files[0]);
});

// Preset Buttons
presetButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentPreset = btn.dataset.preset;
    localStorage.setItem("KINDLE_EXPORT_PRESET", currentPreset);
    render();
  });
});

// Custom Template
customTemplateTextarea.addEventListener("input", (e) => {
  customTemplate = e.target.value;
  localStorage.setItem("KINDLE_EXPORT_TPL", customTemplate);
  if (currentPreset === "custom") {
    render();
  }
});

// Restore Default
restoreDefaultBtn.addEventListener("click", () => {
  customTemplate = TEMPLATES[DEFAULT_PRESET].trim();
  customTemplateTextarea.value = customTemplate;
  localStorage.setItem("KINDLE_EXPORT_TPL", customTemplate);
  if (currentPreset === "custom") {
    render();
  }
});

// ========================================
// INITIALIZATION
// ========================================

function init() {
  // Load from localStorage
  const savedPreset = localStorage.getItem("KINDLE_EXPORT_PRESET");
  const savedTemplate = localStorage.getItem("KINDLE_EXPORT_TPL");

  if (savedPreset) {
    currentPreset = savedPreset;
  }

  if (savedTemplate) {
    customTemplate = savedTemplate;
  }

  customTemplateTextarea.value = customTemplate;

  // Initial render
  render();
}

// Start the app
init();
