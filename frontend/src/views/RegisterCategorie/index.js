import React, { useEffect, useState } from "react";

import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
// Components
import Loader from "../../components/Loader";
import Message from "../../components/Message";
//api
import { callApi } from "../../api";
import {
  CATEGORIE_REGISTER_FAIL,
  CATEGORIE_REGISTER_REQUEST,
  CATEGORIE_REGISTER_SUCESS,
} from "../../constants/categorieConstants";

const initialState = {
  name: "",
  description: "",
};
export default function RegisterCategorie({ history }) {
  const dispatch = useDispatch();
  const [categorie, setCategorie] = useState(initialState);
  const categorieRegister = useSelector(state => state.categorieRegister)
  const {loading, error, success}=categorieRegister;
  const handleChange = (event) => {
    setCategorie({
      ...categorie,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(categorie);
    dispatch(
      callApi("/api/categories/register/", "POST", categorie, {
        SUCESS: CATEGORIE_REGISTER_SUCESS,
        REQUEST: CATEGORIE_REGISTER_REQUEST,
        FAIL: CATEGORIE_REGISTER_FAIL,
      })
    );
  };
  return (
    <Container className="mt-5 form-container" style={{ minHeight: "80vh" }}>
      <h2>Registrar categoria</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre de la categoria</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Ingresa el nombre de la categoria"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            name="description"
            onChange={handleChange}
            as="textarea"
            placeholder="Ingresa la descripcion de la categoria"
            required
          ></Form.Control>
        </Form.Group>
        {loading ? (
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
