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
        {
          //Map() que usa el índice de cada producto como key para una columna donde se mostrará cada producto
        state.data.map((prod) => {
          return(
            <Col key={state.data.indexOf(prod)} sm={12} md={6} lg={4} xl={3}>
              <Product />
            </Col>
          );
        })}

      </Row>
    </Container>
  );
}
