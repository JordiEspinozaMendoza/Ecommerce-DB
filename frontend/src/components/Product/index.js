import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Product({product}) {
  return (
    <Card className="my-3 p-3">
      <Link to={`/product/${product?.id}`}>
        <img
          className="rounded img-responsive mx-auto w-100"
          style={{maxheight: "250px", minheight:"250px"}}
          alt="Producto que se vende"
          src={product?.img}
        ></img>
      </Link>
      <Card.Body>
        <Card.Title>{product?.name}</Card.Title>
        <Card.Text as="div">
          <div className="my-2">
            {product?.description}
          </div>
        </Card.Text>
        <Card.Text as="h3">$ {product?.price}</Card.Text>
        <Link to={`/product/${product?.id}`}>
          <Button variant="warning">Ver detalles</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
