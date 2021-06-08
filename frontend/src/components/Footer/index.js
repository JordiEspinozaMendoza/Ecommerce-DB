import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-warning text-light d-flex align-items-center w-100 flex-column p-4">
      <Row>
        <Col className="text-light" md={6}>
          <h4 className="text-light">Sobre el proyecto</h4>
          <span></span>
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
              <Link to="/admin/product/edit" className="text-light">
                Productos
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </footer>
  );
}
