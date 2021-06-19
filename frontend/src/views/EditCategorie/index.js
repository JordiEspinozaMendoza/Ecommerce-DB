import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CATEGORIE_DETAILS_SUCESS,
  CATEGORIE_DETAILS_REQUEST,
  CATEGORIE_DETAILS_FAIL,
  CATEGORIE_DETAILS_RESET,
  CATEGORIE_UPDATE_RESET,
  CATEGORIE_UPDATE_SUCESS,
  CATEGORIE_UPDATE_FAIL,
  CATEGORIE_UPDATE_REQUEST,
} from "../../constants/categorieConstants";
import { callApi } from "../../api";

//Components
import Loader from "../../components/Loader";
import Message from "../../components/Message";

export default function EditCategorie({ match, history }) {
  const categorieId = match.params.id;
  const dispatch = useDispatch();
  const [categorie, setCategorie] = useState();

  const categorieDetails = useSelector((state) => state.categorieDetails);
  const {
    categorie: categorieDeta,
    success: successGetDetails,
    error: errorGetDetails,
    loading: loadingGetDetails,
  } = categorieDetails;

  const categorieUpdate = useSelector((state) => state.categorieUpdate);
  const {
    categorie: categorieUpdated,
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = categorieUpdate;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleChange = (event) => {
    setCategorie({
      ...categorie,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      callApi(`/api/categories/update/${categorieId}/`, "PUT", categorie, {
        SUCESS: CATEGORIE_UPDATE_SUCESS,
        FAIL: CATEGORIE_UPDATE_FAIL,
        REQUEST: CATEGORIE_UPDATE_REQUEST,
      })
    );
  };
  useEffect(() => {
    !userInfo.isAdmin && history.push("/");
    if (successUpdate) {
      dispatch({ type: CATEGORIE_DETAILS_RESET });
      dispatch({ type: CATEGORIE_UPDATE_RESET });
      history.push("/admin/categories/")
    } else {
      if (categorie?.id != Number(categorieId) || !categorie?.name) {
        dispatch(
          callApi(
            `/api/categories/getcategorie/${categorieId}/`,
            "GET",
            {},
            {
              SUCESS: CATEGORIE_DETAILS_SUCESS,
              FAIL: CATEGORIE_DETAILS_FAIL,
              REQUEST: CATEGORIE_DETAILS_REQUEST,
            }
          )
        );
        successGetDetails && setCategorie(categorieDeta);
      }
    }
  }, [categorieId, successGetDetails, successUpdate]);
  return loadingGetDetails ? (
    <Container className="container-hard">
      <Loader />
    </Container>
  ) : errorGetDetails ? (
    <Container className="container-hard">
      <Message variant="danger">{errorGetDetails}</Message>
    </Container>
  ) : (
    <Container className="mt-5 form-container" style={{ minHeight: "80vh" }}>
      <Link to="/admin/categories/">
        <Button variant="warning">Regresar</Button>
      </Link>
      <h2 className="mt-4">Editar categoria</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre de la categoria</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa el nombre de la categoria"
            required
            name="name"
            onChange={handleChange}
            value={categorie?.name}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la descripcion de la categoria"
            required
            name="description"
            onChange={handleChange}
            value={categorie?.description}
          ></Form.Control>
        </Form.Group>
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loadingUpdate ? (
          <Loader />
        ) : (
          <Button type="submit" className="mt-2" variant="primary">
            Actualizar
          </Button>
        )}
      </Form>
    </Container>
  );
}
