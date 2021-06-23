import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";
//Components
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_RESET,
  ORDER_UPDATE_SUCESS,
} from "../../constants/orderConstants";
import { callApi } from "../../api";
const statusDeliver = ["pedido", "En camino", "Entregado"];
export default function OrderScreen({ history, match }) {
  const orderId = match.params.id;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const orderDetails = useSelector((state) => state.orderDetails);
  const {
    loading: loadingDetails,
    error: errorDetails,
    success: successDetails,
    order: orderDeta,
    items,
  } = orderDetails;
  const orderUpdate = useSelector((state) => state.orderUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = orderUpdate;
  const [status, setStatus] = useState();

  const changeStatus = (e) => {
    e.preventDefault();
    dispatch(
      callApi(
        `/api/orders/update/${orderId}/`,
        "PUT",
        {
          status: status ? status : orderDeta?.statusDeliver,
        },
        {
          SUCESS: ORDER_UPDATE_SUCESS,
          FAIL: ORDER_UPDATE_FAIL,
          REQUEST: ORDER_UPDATE_REQUEST,
        }
      )
    );
  };
  const handleChange = () => {};
  useEffect(() => {
    if (!userInfo?.isAdmin)
      (!userInfo || userInfo?.id != orderDeta?.idUser) && history.push("/");
    else !userInfo && history.push("/");
    if (successUpdate) {
      dispatch({ type: ORDER_UPDATE_RESET });
      dispatch({ type: ORDER_DETAILS_RESET });
      history.push("/admin/orders");
    } else {
      dispatch(
        callApi(
          `/api/orders/getorder/${orderId}/`,
          "GET",
          {},
          {
            SUCESS: ORDER_DETAILS_SUCESS,
            FAIL: ORDER_DETAILS_FAIL,
            REQUEST: ORDER_DETAILS_REQUEST,
          }
        )
      );
    }
    setStatus(orderDeta?.statusDeliver);
  }, [history, orderId]);
  return (
    <Row style={{ minHeight: "80vh", overflowX: "hidden" }}>
      <Col md={6} className="p-5">
        <h4>Articulos comprados</h4>
        {loadingDetails ? (
          <Loader />
        ) : (
          <>
            <ListGroup variant="flush">
              {items?.map((product) => (
                <ListGroup.Item key={product?.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={product?.img}
                        alt={product?.product}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col xl={3}>
                      <Link to={`/product/${product?.idProduct}`}>
                        {product?.product}
                      </Link>
                    </Col>
                    <Col xl={2}>${product?.price} </Col>
                    <Col xl={3}>{product.qty}X</Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card className="mt-4 p-3">
              <ListGroup variant="flush">
                <h5>
                  Total ({items?.length}) productos <br />$
                  {items
                    ?.reduce(
                      (acc, product) => acc + product.qty * product.price,
                      0
                    )
                    .toFixed(2)}
                </h5>
              </ListGroup>
            </Card>
          </>
        )}
      </Col>
      {loadingDetails ? null : (
        <Col md={6} className="p-5">
          <h3>Datos de envío</h3>
          {successUpdate && (
            <Message variant="success">Estatus de estrega actualizado</Message>
          )}
          <Form onSubmit={changeStatus}>
            <Form.Group controlId="country">
              <Form.Label>País</Form.Label>
              <Form.Control
                name="country"
                type="text"
                placeholder="Ingresa tu país"
                value={orderDeta?.country}
                onChange={handleChange}
                required
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="city">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                name="city"
                type="text"
                placeholder="Ingresa la ciudad"
                value={orderDeta?.city}
                onChange={handleChange}
                required
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="street">
              <Form.Label>Calle</Form.Label>
              <Form.Control
                name="street"
                type="text"
                placeholder="Ingresa la calle"
                value={orderDeta?.street}
                onChange={handleChange}
                required
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="zipcode">
              <Form.Label>Codígo postal</Form.Label>
              <Form.Control
                name="zipcode"
                type="text"
                placeholder="Ingresa tu codígo postal"
                value={orderDeta?.zip}
                onChange={handleChange}
                required
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="statusDeliver">
              <Form.Label>Estatus de pago</Form.Label>
              {userInfo?.isAdmin ? (
                <Form.Control
                  name="statusPay"
                  as="select"
                  value={status ? status : orderDeta?.statusDeliver}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  {statusDeliver.map((value) => (
                    <option
                      value={value}
                      selected={value === orderDeta?.statusDeliver}
                    >
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </option>
                  ))}
                </Form.Control>
              ) : (
                <Form.Control
                  name="statusPay"
                  value={orderDeta?.zip}
                  onChange={handleChange}
                  required
                  readOnly
                  value={
                    orderDeta?.statusDeliver.charAt(0).toUpperCase() +
                    orderDeta?.statusDeliver.slice(1)
                  }
                />
              )}
            </Form.Group>
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {userInfo?.isAdmin ? (
              <Button variant="success" type="submit" className="mt-4">
                Actualizar
              </Button>
            ) : null}
          </Form>
        </Col>
      )}
    </Row>
  );
}
