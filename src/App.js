import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import dark from './styles/themes/dark';
import GlobalStyle from './styles/Global';
import Navbar from './components/Navbar';

import Routes from './routes';

export default function App() {
  const [ navbarState, setNavbarState ] = useState(false);
  function handleNavbar() {
    setNavbarState(!navbarState);
  }

  return (
    <ThemeProvider theme={dark}>
      <BrowserRouter>
        <Navbar
          navbarState={navbarState}
          handleNavbar={handleNavbar} />
        <GlobalStyle />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  )

}
