import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Table, Row, Col, Button, Form } from "react-bootstrap";
import { callApi } from "../../api";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  ORDER_LIST_FAIL,
  ORDER_LIST_RESET,
  ORDER_LIST_SUCESS,
  ORDER_LIST_REQUEST,
} from "../../constants/orderConstants";
import {
  USER_DELETE_FAIL,
  USER_LOGIN_SUCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_REQUEST,
  USER_UPDATE_RESET,
  USER_UPDATE_SUCESS,
} from "../../constants/userConstants";

export default function ProfileScreen({ history }) {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();
  const initialState = {
    name: userInfo?.name,
    lastName: userInfo?.lastName,
    email: userInfo?.email,
    password: userInfo?.password,
  };
  const orderList = useSelector((state) => state.orderList);
  const {
    orders,
    loading: loadingOrders,
    error: errorOrders,
    success: successOrders,
  } = orderList;
  const [user, setUser] = useState(initialState);
  const { name, lastName, email, password } = user;
  const [password2, setPassword2] = useState("");

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
    user: userUpdated,
  } = userUpdate;
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(user.password == password2){
      dispatch(
        callApi(`/api/users/updateuser/${userInfo?.id}/`, "PUT", user, {
          SUCESS: USER_UPDATE_SUCESS,
          REQUEST: USER_UPDATE_REQUEST,
          FAIL: USER_UPDATE_FAIL,
        })
      );
    }

    else{
      dispatch({
        type: USER_UPDATE_FAIL,
        payload: "Ambas contraseñas deben ser iguales",
      });
    }
  };
  useEffect(() => {
    !userInfo && history.push("/");
    dispatch(
      callApi(
        `/api/orders/getorders/${userInfo?.id}/`,
        "GET",
        {},
        {
          SUCESS: ORDER_LIST_SUCESS,
          REQUEST: ORDER_LIST_REQUEST,
          FAIL: ORDER_LIST_FAIL,
        }
      )
    );
    if (successUpdate) {
      localStorage.setItem("userInfo", JSON.stringify(userUpdated));
      dispatch({
        type: USER_LOGIN_SUCESS,
        payload: userUpdated,
      });
    }
  }, [history, dispatch, successUpdate, userInfo]);
  useEffect(() => {
    dispatch({ type: USER_UPDATE_RESET });
  }, [history, dispatch]);

  return (
    <>
      <Row style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <Col xl={4} className="p-5">
          <h2>Perfil</h2>
          {successUpdate && (
            <Message variant="success">
              Perfil actualizado correctamente
            </Message>
          )}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                onChange={handleChange}
                id="name"
                name="name"
                placeholder="Ingresa el nombre"
                required
                value={name}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="lastaName">
              <Form.Label>Apellidos</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="lastName"
                type="text"
                placeholder="Ingresa tus apellidos"
                value={lastName}
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="email"
                type="text"
                placeholder="Ingresa tu correo"
                value={email}
                required
              />
            </Form.Group>
            <Form.Group controlId="lastaName">
              <Form.Label>Nueva contraseña</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                required
              />
            </Form.Group>
            <Form.Group controlId="lastName">
              <Form.Label>Confirma nueva contraseña</Form.Label>
              <Form.Control
                name="password2"
                type="password"
                placeholder="Confirma tu contraseña"
                value={password2}
                onChange={(event) => setPassword2(event.target.value)}
                required
              />
            </Form.Group>
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loadingUpdate ? (
              <Loader />
            ) : (
              <Button type="submit" variant="success" className="mt-4">
                Actualizar perfil
              </Button>
            )}
          </Form>
        </Col>
        <Col xl={8} className="p-5">
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <>
              {" "}
              <h2>Mis pedidos</h2>
              <Table
                striped
                bordered
                hover
                responsive
                className="table-sm mt-3"
              >
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>País</th>
                    <th>Ciudad</th>
                    <th>Calle</th>
                    <th>Zipcode</th>
                    <th>Status envio</th>
                    <th>Status pago</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((order) => (
                    <tr key={order.id}>
                      <td>{order.id}</td>
                      <td>{order.country}</td>
                      <td>{order.city}</td>
                      <td>{order.street}</td>
                      <td>{order.zip}</td>
                      <td>{order.statusDeliver}</td>
                      <td>{order.statusPay}</td>
                      <td>
                        <Button variant="info" onClick = {()=>history.push(`/order/${order.id}`)}>
                          <i className="fas fa-eye"></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </>
  );
}
