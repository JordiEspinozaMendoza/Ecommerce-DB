import {Col, Row, Card, Button, Container} from "react-bootstrap";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import ProductsList from "../../components/ProductsList";

import getRandomImage from "../../constants/getRandomImage";

export default function ProductScreen() {
  /* 
  `idProducto` INT NOT NULL AUTO_INCREMENT COMMENT 'Número autoincrementable identificador del producto',
  `idCategoria` INT NOT NULL COMMENT 'Número de identificador de categoría a la que pertenece el producto',
  `nomProducto` VARCHAR(45) NOT NULL COMMENT 'Nombre ÚNICO del producto',
  `descrProducto` VARCHAR(250) NOT NULL COMMENT 'Texto descriptivo del producto',
  `precioProducto` FLOAT NOT NULL COMMENT 'Precio ($MXN) del producto',
  `cantStock` INT NOT NULL COMMENT 'Cantidad de stock del producto en la tienda',
  */  

  return (
    <>
      <Container className="m-4 p-3 mx-auto">
        <Row style={{ overflowX: "hidden" }}>
        <Col key="1" sm={12} md={6} lg={4} xl={3}>
        <img
          className="rounded img-responsive w-100 mx-auto mb-3"
          alt="Producto que se vende"
          src={getRandomImage()}
        ></img>
        </Col>
        <Col key="2" >
        <div className="mx-auto rounded mb-3">
          <h6 className="mx-auto mb-1 bg-warning rounded p-1 text-center text-white">Categoría aaaaaaaaaaaaaaaaaaaaaa</h6>
          <h3 className="text-center my-1">Nombre del producto</h3> 
          (Descripción de producto) <br/><br/>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, harum vitae repellendus officiis delectus fugiat laboriosam, amet itaque doloribus odio beatae molestiae recusandae, asperiores maiores perferendis soluta. Inventore, doloremque aliquid?
        </div>
        </Col>
        <Col key="3">
          <Card>
            <Card.Title>
              <p className="bg-white rounded m-2 text-center text-warning h2 border">
                $233
              </p>
            </Card.Title>
            <Card.Body>
            (Cosas de entrega y stock/disponibilidad)
              <Card.Text as="h5">
                Disponibles: 24
              </Card.Text>
              <br/><br/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi illum natus facilis quo recusandae totam quisquam ipsum sequi est commodi aspernatur nesciunt possimus ut voluptates, quas eum suscipit quae odio?
            </Card.Body>
            <button type="button" className="btn btn-primary">Añadir al carro</button>
          </Card>
        </Col>
      </Row>
      </Container>

      

      <ProductsList />
    </>
  );
}