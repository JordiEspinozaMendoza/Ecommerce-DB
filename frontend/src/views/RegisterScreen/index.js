import React, { useState, useEffect } from "react";

import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components
import Loader from "../../components/Loader";
import Alert from "../../components/Message";

import { callApi } from "../../api";
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCESS,
} from "../../constants/userConstants";

const initialState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
};
export default function RegisterScreen({ history }) {
  const [user, setUser] = useState(initialState);
  const { name, lastName, email, password } = user;
  const [password2, setPassword2] = useState("");

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success, userInfo } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { success: succesLogin } = userLogin;

  const dispatch = useDispatch();
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(user);
    dispatch(
      callApi("/api/users/register/", "POST", user, {
        SUCESS: USER_REGISTER_SUCESS,
        REQUEST: USER_REGISTER_REQUEST,
        FAIL: USER_REGISTER_FAIL,
      })
    );
  };
  useEffect(() => {
    if (success) {
      dispatch(
        callApi("/api/users/login/", "POST", user, {
          SUCESS: USER_LOGIN_SUCESS,
          REQUEST: USER_LOGIN_REQUEST,
          FAIL: USER_LOGIN_FAIL,
        })
      );
    }
  }, [success]);
  useEffect(() => {
    if (succesLogin) history.push("/");
  }, [succesLogin]);
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  return (
    <Container className="form-container">
      <h1 className="text-center">Registro</h1>
      <span className="text-dark d-block text-center">
        Llena los campos correspondientes para registrarte
      </span>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="name"
            type="text"
            placeholder="Ingresa tu nombre"
            value={name}
            required
          />
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
        <Form.Group controlId="lastaName">
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

        <span className="text-dark d-block text-center mt-4">
          Si ya cuentas con una cuenta, haz login <Link to="/login">aqui</Link>
        </span>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <Loader />
        ) : (
          <Button type="submit" variant="success" className="mt-4">
            Registrarme
          </Button>
        )}
      </Form>
    </Container>
  );
}
