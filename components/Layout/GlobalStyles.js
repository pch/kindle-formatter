import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  :root {
    /* Color palette: from lightest to darkest */
    --white: #fff;

    /* Neutrals */
    --light-grey-1: #F5F7FA;
    --light-grey-2: #E4E7EB;
    --light-grey-3: #CBD2D9;
    --light-grey-4: #9AA5B1;
    --light-grey-5: #7B8794;

    --grey-1: #616E7C;
    --grey-2: #52606D;
    --grey-3: #3E4C59;
    --grey-4: #323F4B;
    --grey-5: #1F2933;

    /* Main: Indigo */
    --light-indigo-1: #E0E8F9;
    --light-indigo-2: #BED0F7;
    --light-indigo-3: #98AEEB;
    --light-indigo-4: #7B93DB;
    --light-indigo-5: #647ACB;

    --indigo-1: #4C63B6;
    --indigo-2: #4055A8;
    --indigo-3: #35469C;
    --indigo-4: #2D3A8C;
    --indigo-5: #19216C;

    /* ---------------------------------------------------------*/

    /* Spacing */
    --spacing-2xs: 4px;
    --spacing-xs: 8px;
    --spacing-sm: 12px;
    --spacing-md: 16px;
    --spacing-lg: 24px;
    --spacing-xl: 32px;
    --spacing-2xl: 48px;
    --spacing-3xl: 64px;
    --spacing-4xl: 128px;

    /* Text sizes */
    --text-2xs: 10px;
    --text-xs: 12px;
    --text-sm: 14px;
    --text-md: 16px;
    --text-lg: 18px;
    --text-xl: 20px;
    --text-2xl: 24px;
    --text-3xl: 30px;
    --text-4xl: 36px;
    --text-5xl: 48px;

    --background-color: white;
    --font-family: "Inter", -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    --text-color: var(--grey-5);
    --light-text-color: var(--light-grey-5);
    --link-color: var(--indigo-1);
    --base-font-size: var(--text-md);
    --border-radius: 4px;
    --border-color: var(--light-grey-2);
    --box-shadow: 0 1px 5px rgba(0, 0, 0, .2);
    --line-height: 1.5;

    --button-bg: var(--light-indigo-5);
    --button-bg-hover: var(--light-indigo-4);
    --button-bg-secondary: var(--main-indigo);
    --button-color: var(--white);
    --button-border-radius: var(--border-radius);
    --button-padding: var(--spacing-xs) var(--spacing-md);

    --header-height: 50px;
    --header-padding: 0 var(--spacing-lg);
    --header-bg: var(--indigo-2);
    --header-text-volor: var(--white);
  }

  * {
    box-sizing: border-box;
  }

  html {
    font-family: var(--font-family);
    box-sizing: border-box;
    font-size: var(---base-font-size);
  }

  body {
    background-color: var(--background-color);
    color: var(--text-color);
    overscroll-behavior: none;
    transition: all 0.2s;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  h1,h2,h3,h4,h5,h6 {
    font-weight: normal;
    line-height: 1.5;
  }

  a {
    color: var(--link-color);
    text-decoration: none;
  }

  p, ul, ol {
    line-height: 1.77;
    font-weight: 400;
  }

  p:first-child {
    margin-top: 0;
  }

  h1, h2, h3, h4 {
    font-weight: 600;
  }

  button {
    padding: 0;
    background: none;
    outline: none;
    border: none;
    cursor: pointer;
    color: var(--text-color);
  }

  strong {
    font-weight: 600;
  }
`;

export default GlobalStyles;
