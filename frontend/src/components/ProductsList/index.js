import Product from "../Product";
import { Row, Col, Container } from "react-bootstrap";

export default function ProductsList({products}) {
let key = 1 
try{
  key = products?.values().next().value["categorie"];
}catch(e){}
  return (
    <Container className="">
      <Row >
        {products?.map((product) => {
          return(
            <Col key={products?.indexOf(product)} lg={3} md={4} sm={6} xs={6} className="justify-content-center align-items-center">
              <Product product={product}/>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
