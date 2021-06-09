import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function LoginScreen() {
  return (
    <Container className="form-container">
      <h1 className="text-center">Login</h1>
      <span className="text-dark d-block text-center">
        Llena los campos correspondientes para iniciar sesion
      </span>
      <Form>
        <Form.Group controlId="lastaName">
          <Form.Label>Correo</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu correo" />
        </Form.Group>
        <Form.Group controlId="lastaName">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control type="text" placeholder="Ingresa tu contraseña" />
        </Form.Group>

        <span className="text-dark d-block text-center mt-4">
          Si no cuentas con una cuenta registrate <Link to="/register">aqui</Link>
        </span>
        <Button type="submit" variant="success" className="mt-4">
          Login
        </Button>
      </Form>
    </Container>
  );
}
