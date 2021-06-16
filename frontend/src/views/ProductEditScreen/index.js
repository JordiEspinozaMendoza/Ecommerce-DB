import React, { useState, useEffect } from "react";

import { Link, link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Components
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { callApi } from "../../api";
import {
  PRODUCT_REGISTER_SUCESS,
  PRODUCT_REGISTER_FAIL,
  PRODUCT_REGISTER_REQUEST,
} from "../../constants/productConstants";

const initialState = {
  name: "",
  description: "",
  categorie: "",
  price: 0.0,
  countInStock: 0,
};

export default function ProductEditScreen({ match, history }) {
  const dispatch = useDispatch();

  const [product, setProduct] = useState(initialState);

  const productRegister = useSelector((state) => state.productRegister);
  const {
    loading,
    error,
    success,
    product: productRegistered,
  } = productRegister;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      callApi("/api/products/register/", "POST", product, {
        SUCESS: PRODUCT_REGISTER_SUCESS,
        FAIL: PRODUCT_REGISTER_FAIL,
        REQUEST: PRODUCT_REGISTER_REQUEST,
      })
    );
  };
  useEffect(() => {
    if (!userInfo?.isAdmin) history.push("/");
  }, [userInfo]);
  return (
    <Container className="form-container">
      <Link to="/">
        <Button variant="warning">Regresar</Button>
      </Link>
      <h1>Editar producto</h1>
      <span className="text-dark">
        Llena los campos correspondientes para registrar tu producto
      </span>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Ingresa el nombre del producto"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            type="text"
            placeholder="Ingresa la descripcion del producto"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group
          name="categorie"
          controlId="categorie"
          onChange={handleChange}
        >
          <Form.Label>Categoria</Form.Label>
          <Form.Control as="select" type="text">
            <option>Test</option>
            <option>Test</option>
            <option>Test</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            name="price"
            type="number"
            placeholder="Ingresa el precio del producto"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="countInStock">
          <Form.Label>Cantidad en stock</Form.Label>
          <Form.Control
            name="countInStock"
            type="number"
            placeholder="Ingresa la cantidad en stock"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la imagen"
          ></Form.Control>
          <Form.File id="image-file" label="Elegir imagen" custom />
        </Form.Group>
        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Button type="submit" variant="success" className="mt-5">
            Enviar
          </Button>
        )}
      </Form>
    </Container>
  );
}
