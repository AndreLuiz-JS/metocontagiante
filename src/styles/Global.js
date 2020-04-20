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
  .calendar {
    position:absolute;
    display:flex;
    flex-direction:column;
    justify-content:center;
    align-items:center;
  }
  .dateTimePicker {
    background:silver;
    color:#000;
  }
`;

export default GlobalStyles;