export const TEMPLATES = {
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
