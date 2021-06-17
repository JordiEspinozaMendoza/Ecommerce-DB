import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Button,
  Row,
  Col,
  Container,
  Form,
  FormControl,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

//Components
import ProductPanel from "../../components/ProductPanel";
import Loader from "../../components/Loader";
//api
import { callApi } from "../../api";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCESS,
} from "../../constants/productConstants";
export default function ProductListScreen({ history }) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (userInfo?.isAdmin) {
      dispatch(
        callApi(
          "/api/products/getproducts/",
          "GET",
          {},
          {
            SUCESS: PRODUCT_LIST_SUCESS,
            FAIL: PRODUCT_LIST_FAIL,
            REQUEST: PRODUCT_LIST_REQUEST,
          }
        )
      );
    } else {
      history.push("/");
    }
  }, [userInfo, history]);
  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1>Productos</h1>
        </Col>
        <Col>
          <Link to="/admin/products/register">
            <Button
              variant="primary"
              className="d-block"
              style={{ marginLeft: "auto" }}
            >
              <i className="fas fa-plus"></i> Crear producto
            </Button>
          </Link>
        </Col>
        <Row>
          <Col>
            <Form inline>
              <Form.Control
                type="text"
                placeholder="Buscar producto"
              ></Form.Control>
              <Button type="submit" className="mt-2" variant="outline-success">
                Buscar
              </Button>
            </Form>
          </Col>
        </Row>
        <>
          <Row className="w-100 m-0">
            {loading ? (
              <Loader />
            ) : (
              <>
                {products?.map((product) => (
                  <Col xs={12} className="d-flex justify-content-center m-0">
                    <ProductPanel product={product}></ProductPanel>
                  </Col>
                ))}
              </>
            )}
          </Row>
        </>
      </Row>
    </Container>
  );
}