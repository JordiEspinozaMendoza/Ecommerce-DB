import { Image, Row, Col } from "react-bootstrap";
import "./styles.css";
export default function ProductPanel({ product, children }) {
  return (
    <Row className="d-flex w-100 product-panel">
      <Col md={3} xs={12}>
        {product?.img && (
          <div className="d-flex justify-content-center">
            <Image className="d-block my-4 shadow" src={product.img} />
          </div>
        )}
      </Col>
      <Col className="p-4" md={9} xs={12}>
        <h4 style={{ color: "#333" }}>{product?.name}</h4>
        <h6><b>Categoría</b> {product?.nameCategorie}</h6>
        <span><b>ID:</b> {product?.id}</span>
        <span><b>Precio: </b>$ {product?.price}</span>
        <span><b>Cantidad en stock: </b>{product?.countInStock}</span>
        <span>{product?.description}</span>
        {children}
      </Col>
    </Row>
  );
}
