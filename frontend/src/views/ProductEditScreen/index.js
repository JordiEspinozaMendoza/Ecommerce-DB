import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link, link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

export default function ProductEditScreen({ match, history }) {
  return (
    <Container className="form-container">
      <Link to="/">
        <Button variant="warning">Regresar</Button>
      </Link>
      <h1>Editar producto</h1>
      <span className="text-dark">
        Llena los campos correspondientes para registrar tu producto
      </span>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa el nombre del producto"
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            as="textarea"
            type="text"
            placeholder="Ingresa la descripcion del producto"
          />
        </Form.Group>
        <Form.Group controlId="categorie">
          <Form.Label>Categoria</Form.Label>
          <Form.Control as="select" type="text">
            <option>Test</option>
            <option>Test</option>
            <option>Test</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="precio">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa el precio del producto"
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
        <Button type="submit" variant="success" className="mt-5">
          Enviar
        </Button>
      </Form>
    </Container>
  );
}
