//React
import React, {useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
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
import { Link } from "react-router-dom";
//api
import { callApi } from "../../api";
//CONSTANTS
import { USER_LOGOUT } from "../../constants/userConstants";
import{
  CATEGORIE_LIST_REQUEST,
  CATEGORIE_LIST_SUCESS,
  CATEGORIE_LIST_FAIL,
} from "../../constants/categorieConstants";


export default function NavigationBar(history) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const categorieList = useSelector((state) => state.categorieList);
  const { loadingCat, categories, errorCat } = categorieList;

  //GET
  useEffect(() => {
    dispatch(
        callApi(
          "/api/categories/getcategories/",
          "GET",
          {},
          {
            SUCESS: CATEGORIE_LIST_SUCESS,
            FAIL: CATEGORIE_LIST_FAIL,
            REQUEST: CATEGORIE_LIST_REQUEST,
          }
        )
      );
  }, [userInfo, history]);

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
              {categories?.map(cat => {
                return(
                  <LinkContainer to={`/categories/${cat.name}`}>
                    <NavDropdown.Item>{cat.name}</NavDropdown.Item>
                  </LinkContainer>
                );
              })}
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
            {userInfo ? (
              <>
                <NavDropdown title="Cuenta">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Perfil</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item
                    onClick={() => dispatch({ type: USER_LOGOUT })}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
                {userInfo.isAdmin && (
                  <NavDropdown title="Admin">
                    <LinkContainer to="/admin/products/">
                      <NavDropdown.Item>Productos</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/admin/categories/">
                      <NavDropdown.Item>Categorias</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
              </>
            ) : (
              <LinkContainer to="/login">
                <Nav.Link>
                  <i className="fas fa-user"></i> Login
                </Nav.Link>
              </LinkContainer>
            )}
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
