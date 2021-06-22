import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { callApi } from "../../api";
import {
  CATEGORIE_LIST_FAIL,
  CATEGORIE_LIST_REQUEST,
  CATEGORIE_LIST_SUCESS,
} from "../../constants/categorieConstants";

export default function CategoriesScreen({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   const categorieDelete = useSelector((state) => state.categorieDelete);
  //   const {
  //     loading: loadingDelete,
  //     success: successDelete,
  //     message: messageDelete,
  //     error: errorDelete,
  //   } = categorieDelete;

  const categorieList = useSelector((state) => state.categorieList);
  const { loading: loadingList, error: errorList, categories } = categorieList;

  useEffect(() => {
    // dispatch({ type: CATEGORIE_DELETE_RESET });

    !userInfo
      ? history.push("/")
      : dispatch(
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
  }, [dispatch, history, userInfo]);

  const deleteCategorieHandler = (id) => {
    // window.confirm("¿Segur@ de querer eliminar esta categoría?") &&
    //   dispatch(deleteCategorie(id));
  };

  return (
    <Container className="mt-5" style={{ minHeight: "80vh" }}>
      <main>
        <>
          {/* {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>} */}
        </>
        <Row>
          <Col>
            <h1>Categorias</h1>
          </Col>
          <Col className="text-right">
            <Link to="/admin/categories/register">
              <Button
                variant="primary"
                className="d-block"
                style={{ marginLeft: "auto" }}
              >
                <i className="fas fa-plus"></i> Crear categoria
              </Button>
            </Link>
          </Col>
        </Row>
        <Row>
          {loadingList ? (
            <Container className="container-hard">
              <Loader />
            </Container>
          ) : errorList ? (
            <Container className="container-hard">
              <Message variant="danger">{errorList}</Message>
            </Container>
          ) : (
            <Table striped bordered hover responsive className="table-sm mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {categories?.map((categorie) => (
                  <tr key={categorie.id}>
                    <td>{categorie.id}</td>
                    <td>{categorie.name}</td>
                    <td>
                      <LinkContainer
                        to={`/admin/categories/edit/${categorie.id}/`}
                      >
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      {/* <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteCategorieHandler(categorie._id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
      </main>
    </Container>
  );
}
