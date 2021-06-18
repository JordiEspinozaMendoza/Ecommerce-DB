import React, { useState, useEffect } from "react";

import { Link, link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Components
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { callApi } from "../../api";
import {
  PRODUCT_REGISTER_SUCESS,
  PRODUCT_REGISTER_FAIL,
  PRODUCT_REGISTER_REQUEST,
  PRODUCT_REGISTER_RESET,
} from "../../constants/productConstants";
import {
  CATEGORIE_LIST_FAIL,
  CATEGORIE_LIST_REQUEST,
  CATEGORIE_LIST_SUCESS,
} from "../../constants/categorieConstants";

const initialState = {
  name: "",
  description: "",
  categorie: "",
  price: 0.0,
  countInStock: 0,
  image: undefined,
};

export default function ProductRegisterScreen({ match, history }) {
  const dispatch = useDispatch();

  const [product, setProduct] = useState(initialState);
  const [image, setImage] = useState();
  const [categorieId, setCategorieId] =useState(1);
  const productRegister = useSelector((state) => state.productRegister);
  const {
    loading,
    error,
    success,
    product: productRegistered,
  } = productRegister;

  const categorieList = useSelector((state) => state.categorieList);
  const { categories } = categorieList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    if (success) {
      dispatch({
        type: PRODUCT_REGISTER_RESET,
      });
      history.push("/");
    }
  }, [success]);
  useEffect(() => {
    dispatch(
      callApi(
        "/api/categories/getcategories/",
        "GET",
        {},
        {
          SUCESS: CATEGORIE_LIST_SUCESS,
          FAIL: CATEGORIE_LIST_FAIL,
          REQUEST: CATEGORIE_LIST_REQUEST,
        }
      )
    );
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const productData = new FormData();
    productData.append("name", product.name);
    productData.append("lastName", product.lastName);
    productData.append("price", product.price);
    productData.append("countInStock", product.countInStock);
    productData.append("description", product.description);
    productData.append("categorie", categorieId);
    productData.append("image", image);
    dispatch(
      callApi(
        "/api/products/register/",
        "POST",
        productData,
        {
          SUCESS: PRODUCT_REGISTER_SUCESS,
          FAIL: PRODUCT_REGISTER_FAIL,
          REQUEST: PRODUCT_REGISTER_REQUEST,
        },
        true
      )
    );
  };
  useEffect(() => {
    if (!userInfo?.isAdmin) history.push("/");
  }, [userInfo]);
  return (
    <Container className="form-container">
      <Link to="/admin/products/">
        <Button variant="warning">Regresar</Button>
      </Link>
      <h1>Registar producto</h1>
      <span className="text-dark">
        Llena los campos correspondientes para registrar tu producto
      </span>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Ingresa el nombre del producto"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Descripcion</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            type="text"
            placeholder="Ingresa la descripcion del producto"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group
          name="categorie"
          controlId="categorie"
          onChange={handleChange}
        >
          <Form.Label>Categoria</Form.Label>
          <Form.Control as="select" type="text" onChange={(e)=>setCategorieId(e.target.value)}>
            {categories?.map((categorie) => (
              <option value={categorie.id}>{categorie.name}</option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            name="price"
            type="number"
            placeholder="Ingresa el precio del producto"
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="countInStock">
          <Form.Label>Cantidad en stock</Form.Label>
          <Form.Control
            name="countInStock"
            type="number"
            placeholder="Ingresa la cantidad en stock"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la imagen"
            value={image}
          ></Form.Control>
          <Form.File
            id="image-file"
            label="Elegir imagen"
            custom
            onChange={(e) => {
              setImage(e.target.files[0]);
              console.log(e.target.files[0]);
            }}
          />
        </Form.Group>
        {error && <Message variant="danger">{error}</Message>}
        {loading ? (
          <Loader />
        ) : (
          <Button type="submit" variant="success" className="mt-5">
            Enviar
          </Button>
        )}
      </Form>
    </Container>
  );
}
