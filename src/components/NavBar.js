import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import Logo from '../assets/Logo';



const NavBar = () => (
    <Navbar style={{ background: "#000" }} expand="md" variant="dark" sticky="top">
        <Navbar.Brand><NavLink className="navbar-brand" to="/" ><Logo size={50} color={"#f4f4f1"} /> Metodista Contagiante</NavLink></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto" defaultActiveKey="/" >
                <Nav.Item><NavLink className="nav-link" activeClassName="nav-link active" to="/bible">Bíblia</NavLink></Nav.Item>
                <Nav.Item><NavLink className="nav-link" activeClassName="nav-link active" to="/maps">Como chegar</NavLink></Nav.Item>
                <Nav.Item><NavLink className="nav-link" activeClassName="nav-link active" to="/spotify">Spotify</NavLink></Nav.Item>
                <Nav.Item><NavLink className="nav-link" activeClassName="nav-link active" to="/social-network">Redes Sociais</NavLink></Nav.Item>
                <Nav.Item><NavLink className="nav-link" activeClassName="nav-link active" to="/contact">Contato</NavLink></Nav.Item>
            </Nav>
        </Navbar.Collapse>
    </Navbar >
)

export default NavBar;