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
//Actions
import { addToCart, removeFromCart } from "../../actions/cartActions";
import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCESS,
} from "../../constants/orderConstants";
import { callApi } from "../../api";
import { CART_CLEAR_ITEMS } from "../../constants/cartConstants";

const initialState = {
  idUser: null,
  city: "",
  country: "",
  street: "",
  zipcode: "",
  items: [],
};
export default function CartScreen({ match, location, history }) {
  let productId = match.params.id;
  let qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const [order, setOrder] = useState(initialState);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const orderCreate = useSelector((state) => state.orderCreate);
  const {
    loading: loadingOrder,
    error: errorOrder,
    success: successOrder,
  } = orderCreate;
  const handleChange = (event) => {
    setOrder({
      ...order,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      callApi("/api/orders/createorder/", "POST", order, {
        SUCESS: ORDER_CREATE_SUCESS,
        REQUEST: ORDER_CREATE_REQUEST,
        FAIL: ORDER_CREATE_FAIL,
      })
    );
  };
  useEffect(() => {
    if (productId && qty) {
      dispatch(addToCart(productId, qty));
    }
    setOrder({
      ...order,
      idUser: userInfo.id,
      items: cartItems,
    });
  }, [dispatch, productId, qty]);
  useEffect(() => {
    if (successOrder) {
      dispatch({ type: CART_CLEAR_ITEMS });
      localStorage.removeItem("cartItems");
      dispatch({ type: ORDER_CREATE_RESET });
      history.push("/profile");
    }
  }, [successOrder]);
  return (
    <Row style={{ minHeight: "80vh", overflowX: "hidden" }}>
      <Col md={6} className="p-5">
        <img
          className="d-inline-block align-top mb-4"
          height="80"
          src="https://res.cloudinary.com/jordiespinoza/image/upload/v1624153215/Ferreter%C3%ADaCano_4_xkiqg6.png"
        />
        {cartItems.length === 0 ? (
          <Message variant="secondary">
            Tu carrito esta vacio
            <br />
            <Link to="/products">Ir a la tienda</Link>
          </Message>
        ) : (
          <>
            <ListGroup variant="flush">
              {cartItems?.map((product) => (
                <ListGroup.Item key={product?.product}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={product?.img}
                        alt={product?.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Col xl={3}>
                      <Link to={`/product/${product?.id}`}>
                        {product?.name}
                      </Link>
                    </Col>
                    <Col xl={2}>${product?.price} </Col>
                    <Col xl={3}>
                      <Form.Group>
                        <Form.Label>Unidades</Form.Label>
                        <Form.Control
                          as="select"
                          value={product?.qty}
                          onChange={(e) =>
                            dispatch(
                              addToCart(
                                product?.product,
                                Number(e.target.value)
                              )
                            )
                          }
                        >
                          {[...Array(product?.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Card className="mt-4 p-3">
              <ListGroup variant="flush">
                <h5>
                  Total (
                  {cartItems.reduce((acc, product) => acc + product.qty, 0)})
                  productos <br />$
                  {cartItems
                    .reduce(
                      (acc, product) => acc + product.qty * product.price,
                      0
                    )
                    .toFixed(2)}
                </h5>
              </ListGroup>
            </Card>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => {
                dispatch({ type: CART_CLEAR_ITEMS });
                localStorage.removeItem("cartItems");
              }}
            >
              Limpiar carrito
            </Button>
          </>
        )}
      </Col>
      <Col md={6} className="p-5">
        <h3>Ingresa tus datos de envío</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="country">
            <Form.Label>País</Form.Label>
            <Form.Control
              name="country"
              type="text"
              placeholder="Ingresa tu país"
              value={order.country}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="city">
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              name="city"
              type="text"
              placeholder="Ingresa la ciudad"
              value={order.city}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="street">
            <Form.Label>Calle</Form.Label>
            <Form.Control
              name="street"
              type="text"
              placeholder="Ingresa la calle"
              value={order.street}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="zipcode">
            <Form.Label>Codígo postal</Form.Label>
            <Form.Control
              name="zipcode"
              type="text"
              placeholder="Ingresa tu codígo postal"
              value={order.zip}
              onChange={handleChange}
              required
            />
          </Form.Group>
          {errorOrder && <Message variant="danger">{errorOrder}</Message>}
          {loadingOrder ? (
            <Loader />
          ) : (
            <Button
              variant="success"
              type="submit"
              className="mt-4"
              disabled={cartItems.length === 0}
            >
              Pagar ahora!
            </Button>
          )}
        </Form>
      </Col>
    </Row>
  );
}
