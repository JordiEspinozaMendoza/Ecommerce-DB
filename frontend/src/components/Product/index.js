import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Product({ product }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  return (
    <Card className="my-3 p-3 mw-100 mh-100">
      <Link to={`/product/${product?.id}`}>
        <div className="w-auto">
          <img
            className="rounded img-responsive m-auto d-block"
            style={{ height: "30vh", width: "100%" }}
            alt="Producto que se vende"
            src={product?.img}
          ></img>
        </div>
      </Link>
      <Card.Body>
        <Card.Title>{product?.name}</Card.Title>
        <Card.Text as="div">
          <div className="my-2">{product?.description.substring(0, 25)}...</div>
        </Card.Text>
        <Card.Text as="h3">$ {product?.price}</Card.Text>
        <Row>
          <Col md={8}>
            <Link
              to={`/product/${product?.id}`}
              style={{ textDecoration: "none" }}
            >
              <Button className="d-block w-100" variant="success">
              <i class="fas fa-hard-hat"></i>{" "}Detalles
              </Button>
            </Link>
          </Col>
          <Col md={4}>
            <Link
              to={userInfo ? `/cart/${product.id}?qty=1` : "/login"}
              style={{ textDecoration: "none" }}
            >
              <Button className="d-block w-100" variant="primary">
              <i class="fas fa-shopping-cart"></i>
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
