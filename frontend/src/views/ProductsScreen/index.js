import ProductsList from "../../components/ProductsList";
import { Row, Col, Container } from "react-bootstrap";

export default function ProductsScreen() {

  return (
    <>
        <Container className="mw-100 px-0 container-fluid">
            <ProductsList/>
            <ProductsList/>
        </Container>
        
    </>
  );
}
