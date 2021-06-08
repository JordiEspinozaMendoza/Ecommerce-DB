import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Product() {
  return (
    <Card className="my-3 p-3">
      <Link to="/">
        <Card.Img
          className="product-img"
          src="https://images.unsplash.com/photo-1588619461335-b81119fee1b5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=375&q=80"
        ></Card.Img>
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
        <Button variant="warning">Ver detalles</Button>
      </Card.Body>
    </Card>
  );
}
