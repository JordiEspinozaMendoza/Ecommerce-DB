import { Image, Row, Col } from "react-bootstrap";
import "./styles.css"
export default function ProductPanel({ product, children }) {
  return (
    <Row className="d-flex w-100 product-panel">
      <Col md={3} xs={12}>
        {/* {product?.img && (
          <div className="d-flex justify-content-center">
            <Image
              className="d-block my-4 shadow-lg"
              src="https://www.officedepot.com.mx/medias/62143.jpg-1200ftw?context=bWFzdGVyfHJvb3R8MzI4OTk2fGltYWdlL2pwZWd8aGUzL2hlMS85Nzk2NDc3NjgxNjk0LmpwZ3xmM2QyYjYwZmVmMzI1ZDEyM2RjMjkzMWUxNmMxYmFjZGUzODJhNDIzZTM4MzA0ZThhMmVmMDZmMjk3MjgzMzc3"
            />
          </div>
        )} */}
        <Image
          className="my-4 shadow"
          src="https://www.officedepot.com.mx/medias/62143.jpg-1200ftw?context=bWFzdGVyfHJvb3R8MzI4OTk2fGltYWdlL2pwZWd8aGUzL2hlMS85Nzk2NDc3NjgxNjk0LmpwZ3xmM2QyYjYwZmVmMzI1ZDEyM2RjMjkzMWUxNmMxYmFjZGUzODJhNDIzZTM4MzA0ZThhMmVmMDZmMjk3MjgzMzc3"
        />
      </Col>
      <Col className="p-4" md={9} xs={12}>
        <b style={{ color: "#333" }}>{product?.name}</b>
        <span>$ {product?.price}</span>
        <span>{product?.description.substring(0, 150)}...</span>
        {children}
      </Col>
    </Row>
  );
}
