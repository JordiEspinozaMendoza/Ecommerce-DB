import React, { useState, useEffect } from "react";
import { Table, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";

import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { callApi } from "../../api";
import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SUCESS,
} from "../../constants/userConstants";

export default function UserListScreen({ history }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const userList = useSelector((state) => state.userList);
  const { loading: loadingUsers, error: errorUsers, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    success: successDelete,
    loading: loadingDelete,
    error: errorDelete,
  } = userDelete;
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successProfile,
    loading: loadingProfile,
    error: errorProfile,
  } = userUpdateProfile;
  const deleteUserHandler = (id) => {
    if (window.confirm("¿Estas seguro de eliminar este usuario?")) {
      dispatch(
        callApi(
          `/api/users/deleteuser/${id}/`,
          "DELETE",
          {},
          {
            SUCESS: USER_DELETE_SUCESS,
            FAIL: USER_DELETE_FAIL,
            REQUEST: USER_DELETE_REQUEST,
          }
        )
      );
    }
  };
  const changePrivilegiesHandler = (id, privilegies) => {
    if (
      window.confirm(
        "¿Estas seguro de cambiar los privilegios de este usuario?"
      )
    ) {
      dispatch(
        callApi(
          `/api/users/changeprivilegies/${id}/`,
          "PUT",
          {
            isAdmin: privilegies,
          },
          {
            SUCESS: USER_UPDATE_PROFILE_SUCESS,
            FAIL: USER_UPDATE_PROFILE_FAIL,
            REQUEST: USER_UPDATE_PROFILE_FAIL,
          }
        )
      );
    }
  };
  useEffect(() => {
    !userInfo?.isAdmin
      ? history.push("/")
      : dispatch(
          callApi(
            "/api/users/getusers/",
            "GET",
            {},
            {
              SUCESS: USER_LIST_SUCESS,
              FAIL: USER_LIST_FAIL,
              REQUEST: USER_LIST_REQUEST,
            }
          )
        );
  }, [dispatch, history, userInfo, successDelete, successProfile]);
  return (
    <Container className="mt-5" style={{ minHeight: "80vh" }}>
      <main>
        <>
          {/* {loadingDelete && <Loader />}
          {errorDelete && <Message variant="danger">{errorDelete}</Message>} */}
        </>
        <Row>
          <Col>
            <h1>Usuarios</h1>
          </Col>
        </Row>
        <Row>
          {errorDelete && <Message variant="danger">{errorDelete}</Message>}
          {successDelete && (
            <Message variant="success">Usuario eliminado correctamente</Message>
          )}
          {errorProfile && <Message variant="danger">{errorProfile}</Message>}
          {successProfile && (
            <Message variant="success">Privilegios de usuario cambiados correctamente</Message>
          )}
          {loadingUsers || loadingDelete || loadingProfile ? (
            <Container className="container-hard">
              <Loader />
            </Container>
          ) : errorUsers ? (
            <Container className="container-hard">
              <Message variant="danger">{errorUsers}</Message>
            </Container>
          ) : (
            <Table striped bordered hover responsive className="table-sm mt-3">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>¿Es admin?</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users?.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      {user.isAdmin ? (
                        <div>
                          <i
                            className="fas fa-check"
                            style={{ color: "green" }}
                          ></i>{" "}
                          {"   "}
                          <span>Admin</span>
                        </div>
                      ) : (
                        <div>
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>{" "}
                          {"   "}
                          <span>No Admin</span>
                        </div>
                      )}

                      <Button
                        variant="secondary"
                        onClick={() =>
                          changePrivilegiesHandler(user.id, !user.isAdmin)
                        }
                      >
                        Cambiar
                      </Button>
                    </td>
                    <td>

                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteUserHandler(user.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Row>
      </main>
    </Container>
  );
}
