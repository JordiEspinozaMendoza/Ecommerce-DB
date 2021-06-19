import Product from "../Product";
import { Row, Col, Container } from "react-bootstrap";

export default function ProductsList({products}) {
let key = 1 
try{
  key = products?.values().next().value["categorie"];
}catch(e){}
  return (
    <Container className="">
      <Row key={key} style={{ overflowX: "show" }}>
        {products?.map((product) => {
          return(
            <Col key={products?.indexOf(product)} lg={"auto"} md={"auto"} className="d-flex justify-content-center flex-fill">
              <Product product={product}/>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
