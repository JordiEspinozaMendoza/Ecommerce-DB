//React
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Col, Row, Card, Button, Container} from "react-bootstrap";

/*
"id": queries[0],
"categorie": queries[1],
"name": queries[2],
"description": queries[3],
"price": queries[4],
"countInStock": queries[5],
"img": queries[6],
*/

export default function ProductDetails({product}) {
  console.log(product);
  return (
    <>
      <Container className="m-4 p-3 mx-auto">
        <Row style={{ overflowX: "hidden" }}>
        <Col key="1" sm={12} md={6} lg={4} xl={3}>
        <img
          className="rounded img-responsive w-100 mx-auto mb-3 shadow"
          alt="Producto que se vende"
          src={product?.img}
        ></img>
        </Col>
        <Col key="2" >
        <div className="mx-auto rounded mb-3">
          <h6 className="mx-auto mb-1 bg-warning rounded p-1 text-center text-white">{product?.categorie}</h6>
          <h3 className="text-center my-1">{product?.name}</h3> 
          <br/>{product?.description} <br/>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque, harum vitae repellendus officiis delectus fugiat laboriosam, amet itaque doloribus odio beatae molestiae recusandae, asperiores maiores perferendis soluta. Inventore, doloremque aliquid?
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
              <br/><br/>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi illum natus facilis quo recusandae totam quisquam ipsum sequi est commodi aspernatur nesciunt possimus ut voluptates, quas eum suscipit quae odio?
            </Card.Body>
            <button type="button" className="btn btn-primary">
            Añadir al carro <i className="fas fa-shopping-cart"></i></button>
          </Card>
        </Col>
      </Row>
      </Container>
    </>
  );
}