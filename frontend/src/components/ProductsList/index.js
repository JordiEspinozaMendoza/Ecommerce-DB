import Product from "../Product";
import { Row, Col, Container } from "react-bootstrap";

export default function ProductsList() {
  return (
    <Container>
      <Row style={{ overflowX: "hidden" }}>
        <Col key="1" sm={12} md={6} lg={4} xl={3}>
          <Product />
        </Col>
        <Col key="2" sm={12} md={6} lg={4} xl={3}>
          <Product />
        </Col>
        <Col key="3" sm={12} md={6} lg={4} xl={3}>
          <Product />
        </Col>
        <Col key="4" sm={12} md={6} lg={4} xl={3}>
          <Product />
        </Col>
      </Row>
    </Container>
  );
}
