import Product from "../Product";
import { Row, Col, Container } from "react-bootstrap";

export default function ProductsList() {

  const state = {
    data:[
      {
        idProducto : 0
      },
      {
        idProducto : 1
      },
      {
        idProducto : 2
      },
      {
        idProducto : 3
      }
    ]
  }
  return (
    <Container>
      <Row style={{ overflowX: "hidden" }}>
        {state.data.map((product) => {
          return(
            <Col key={state.data.indexOf(product)} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
