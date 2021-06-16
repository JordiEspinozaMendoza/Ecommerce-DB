import React from "react";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function NavigationBar() {
  return (
    <Navbar
      sticky="top"
      bg="light"
      collapseOnSelect
      expand="lg"
      className="text-warning"
      style={{ fontWeight: "bold" }}
    >
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Ferreteria</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar1" />
        <Navbar.Collapse id="navbar1">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>Inicio</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/products/">
              <Nav.Link>Tienda</Nav.Link>
            </LinkContainer>
            <NavDropdown title="Categorias" id="collasible-nav-dropdown">
              <NavDropdown.Item>Test</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Busca un articulo"
                className="mr-3"
                aria-label="Search"
              ></FormControl>
              <Button variant="warning">Buscar</Button>
            </Form>
            <LinkContainer to="/">
              <Nav.Link>
                <i className="fas fa-user"></i> Login
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/">
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
