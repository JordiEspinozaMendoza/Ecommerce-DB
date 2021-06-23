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

export default function OrdersListScreen({ history }) {
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

  useEffect(() => {
    !userInfo?.isAdmin && history.push("/");
    dispatch(
      callApi(
        `/api/orders/getorders/`,
        "GET",
        {},
        {
          SUCESS: ORDER_LIST_SUCESS,
          REQUEST: ORDER_LIST_REQUEST,
          FAIL: ORDER_LIST_FAIL,
        }
      )
    );
  }, [history, dispatch, successUpdate, userInfo]);
  useEffect(() => {
  }, [history, dispatch]);

  return (
    <>
      <Row style={{ minHeight: "100vh", overflowX: "hidden" }}>
        <Col className="p-5">
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
                        <Button
                          variant="info"
                          onClick={() => history.push(`/order/${order.id}`)}
                        >
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
