import React, { useEffect, useState } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";

export default function EditCategorie({ history }) {
  return (
    <Container className="mt-5 form-container" style={{ minHeight: "80vh" }}>
      <h2>Editar categoria</h2>
      <Form>
        <Form.Group controlId="name">
          <Form.Label>Nombre de la categoria</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa el nombre de la categoria"
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la descripcion de la categoria"
            required
          ></Form.Control>
        </Form.Group>
        <Button className="mt-2" variant="primary">
          Actualizar
        </Button>
      </Form>
    </Container>
  );
}
