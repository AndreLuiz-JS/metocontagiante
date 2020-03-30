import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './components/NavBar'
import Routes from './routes';

class App extends Component {

  render() {
    return (
      <Container>
        <BrowserRouter>
          <NavBar />
          <Routes />
        </BrowserRouter>
      </Container>
    )
  }
}

export default App;
