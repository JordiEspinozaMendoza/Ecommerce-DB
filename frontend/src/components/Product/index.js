import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import getRandomImage from "../../constants/getRandomImage";
export default function Product() {
  const idProducto = 1;
  return (
    <Card className="my-3 p-3">
      <Link to={`/product/${idProducto}`}>
        <img
          className="rounded img-responsive w-100 mx-auto mb-3"
          style={{height: "250px"}}
          alt="Producto que se vende"
          src={getRandomImage()}
        ></img>
      </Link>
      <Card.Body>
        <Card.Title>Producto</Card.Title>
        <Card.Text as="div">
          <div className="my-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </div>
        </Card.Text>
        <Card.Text as="h3">$ 250.00</Card.Text>
        <Link to={`/product/${idProducto}`}>
          <Button variant="warning">Ver detalles</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
