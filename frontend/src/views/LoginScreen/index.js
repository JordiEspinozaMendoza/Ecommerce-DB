import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// Components
import Loader from "../../components/Loader";
import Alert from "../../components/Message";
import { callApi } from "../../api";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_RESET,
  USER_LOGIN_SUCESS,
} from "../../constants/userConstants";

const initialState = {
  email: "",
  password: "",
};

export default function LoginScreen({ history }) {
  const [user, setUser] = useState(initialState);
  const { email, password } = user;

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, success, userInfo } = userLogin;

  const dispatch = useDispatch();
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      callApi("/api/users/login/", "POST", user, {
        SUCESS: USER_LOGIN_SUCESS,
        REQUEST: USER_LOGIN_REQUEST,
        FAIL: USER_LOGIN_FAIL,
      })
    );
  };
  useEffect(() => {
    if (success) {
      history.push("/");
    }
  }, [success]);
  useEffect(() => {
    if (userInfo) {
      history.push("/");
    }
  }, [history, userInfo]);
  useEffect(() => {
    dispatch({ type: USER_LOGIN_RESET });
  }, [history]);
  return (
    <Container className="form-container">
      <h1 className="text-center">Login</h1>
      <span className="text-dark d-block text-center">
        Llena los campos correspondientes para iniciar sesion
      </span>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Correo</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Ingresa tu correo"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Ingresa tu contraseña"
            onChange={handleChange}
            required
          />
        </Form.Group>

        <span className="text-dark d-block text-center mt-4">
          Si no cuentas con una cuenta registrate{" "}
          <Link to="/register">aqui</Link>
        </span>
        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
          <Loader />
        ) : (
          <Button type="submit" variant="success" className="mt-4">
            Login
          </Button>
        )}
      </Form>
    </Container>
  );
}
