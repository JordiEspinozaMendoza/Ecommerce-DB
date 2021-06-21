//React
import { Col, Row, Card, Container } from "react-bootstrap";
import ImageZoom from "react-medium-image-zoom";

export default function ProductDetails({ product, children }) {
  return (
    <>
      <Container className="m-4 p-3 mx-auto">
        <Row style={{ overflowX: "hidden" }}>
          <Col key="1" sm={12} md={6} lg={4} xl={3}>
          <ImageZoom
              image={{
                src: product?.img,
                alt: `${product?.name}`,
                className: "rounded img-responsive w-100 mx-auto mb-3 shadow",
              }}
              zoomImage={{
                src: product?.img,
                alt: `${product?.name}`,
              }}
            />
          </Col>
          <Col key="2">
            <div className="mx-auto rounded mb-3">
              <h6 className="mx-auto mb-1 bg-warning rounded p-1 text-center text-white">
                {product?.nameCategorie}
              </h6>
              <h3 className="text-center py-3">{product?.name}</h3>
              <div className="pt-2">{product?.description}</div>
            </div>
          </Col>
          <Col key="3">
            <Card>
              <Card.Title>
                <p className="bg-white rounded m-2 text-center text-warning h2 border">
                  $ {product?.price}
                </p>
              </Card.Title>
              <Card.Body>
                <Card.Text as="h5">
                  Disponibles: {product?.countInStock}
                </Card.Text>
              </Card.Body>
              {children}

            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
