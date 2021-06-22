import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-warning text-light d-flex align-items-center w-100 flex-column p-4">
      <Row>
        <Col className="text-light" md={6}>
          <h4 className="text-light">Sobre el proyecto</h4>
          <span>
            El fin de este proyecto es crear una página web que permita el
            registro de usuarios, así como de su ingreso a la página para poder
            realizar compras por internet, Se desplegarán algunas pantallas que
            formarán parte de la interfaz de usuario. Asimismo se verán los
            artículos que el cliente pueda comprar y agregar al carrito de
            compras.
          </span>
        </Col>
        <Col md={6} className="text-light" className="text-light">
          <h4 className="text-light">Links rapidos</h4>
          <div style={{ fontSize: "14px", color: "#fff" }}>
            <p className="text-light">
              <Link to="/" className="text-light">
                Inicio
              </Link>
            </p>
            <p className="text-light">
              <Link to="/products" className="text-light">
                Productos
              </Link>
            </p>
            <p className="text-light">
              <Link to="/register" className="text-light">
                Registro
              </Link>
            </p>
            <p className="text-light">
              <Link to="/login" className="text-light">
                Login
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </footer>
  );
}
