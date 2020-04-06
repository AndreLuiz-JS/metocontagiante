import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    font-size: 62.5%;
  }

  body {
    background: #000;
    color:#f4f4f4;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    margin-bottom: 50px;
    overflow-x:hidden;
  }
`;

export default GlobalStyles;