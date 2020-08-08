import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import theme from './styles/themes/default';
import GlobalStyle from './styles/Global';
import Navbar from './components/Navbar';
import { SocialMedia } from './components/SocialMedia';

import Routes from './routes';

export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Navbar />
        <GlobalStyle />
        <Routes />
        <SocialMedia />
      </BrowserRouter>
    </ThemeProvider>
  )

}
