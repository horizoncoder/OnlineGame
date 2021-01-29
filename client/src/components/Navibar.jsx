import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NaviBar() {
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>JS Game</Navbar.Brand>
        <Navbar.Toggle arial-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>
              <Link to="/">Главная</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/login">Логин/Регистрация</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to="/stats">Статистика</Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}