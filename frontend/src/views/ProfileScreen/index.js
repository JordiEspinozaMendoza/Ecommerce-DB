import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Row, Col, Image, Button, Form } from "react-bootstrap";

export default function ProfileScreen({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const initialState = {
    name: userInfo?.name,
    lastName: userInfo?.lastName,
    email: userInfo?.email,
    password: userInfo?.password,
  };

  const [user, setUser] = useState(initialState);
  const { name, lastName, email, password } = user;
  const [password2, setPassword2] = useState("");
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    userInfo == null && history.push("/");
  }, [history, dispatch]);
  
  return (
    <>
      <Row style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <Col xl={4} className="p-5">
          <h2>Perfil</h2>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                id="name"
                placeholder="Ingresa el nombre"
                required
                value={name}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="lastaName">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="lastName"
                type="text"
                placeholder="Ingresa tus apellidos"
                value={lastName}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="Ingresa tu correo"
                value={email}
                required
              />
            </Form.Group>
            <Form.Group controlId="lastaName">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                required
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Confirma contraseña</Form.Label>
              <Form.Control
                name="password2"
                type="password"
                placeholder="Confirma tu contraseña"
                value={password2}
                onChange={(event) => setPassword2(event.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success" className="mt-4">
              Actualizar perfil
            </Button>
          </Form>
        </Col>
        <Col xl={8} className="p-5">
          <h2>Mis pedidos</h2>
        </Col>
      </Row>
    </>
  );
}
