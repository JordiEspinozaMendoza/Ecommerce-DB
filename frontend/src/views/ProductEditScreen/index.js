import React, { useState, useEffect } from "react";

import { Link, link } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

// Components
import Loader from "../../components/Loader";
import Message from "../../components/Message";

import { callApi } from "../../api";
import {
  PRODUCT_UPDATE_SUCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCESS,
} from "../../constants/productConstants";
import {
  CATEGORIE_LIST_FAIL,
  CATEGORIE_LIST_REQUEST,
  CATEGORIE_LIST_SUCESS,
} from "../../constants/categorieConstants";

export default function ProductEditScreen({ match, history }) {
  const productId = match.params.id;
  const dispatch = useDispatch();

  const [product, setProduct] = useState();
  const [image, setImage] = useState(product?.image);
  const [categorieId, setCategorieId] = useState(1);

  const [updateImage, setUpdateImage] = useState(false);

  const productUpdate = useSelector((state) => state.productUpdate);
  const { loading, error, success, product: productUpdated } = productUpdate;

  const categorieList = useSelector((state) => state.categorieList);
  const { categories, loading: loadingCategorie } = categorieList;
  const productDetails = useSelector((state) => state.productDetails);
  const {
    product: productDeta,
    success: successGetDetails,
    loading: loadingDetails,
    error: errorDetails,
  } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const handleChange = (event) => {
    setProduct({
      ...product,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    !userInfo.isAdmin && history.push("/");
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
    if (success) {
      dispatch({
        type: PRODUCT_UPDATE_RESET,
      });
      dispatch({
        type: PRODUCT_DETAILS_RESET,
      });
      history.push("/admin/products/");
    } else {
      if (product?.id != Number(productId) || !product?.name) {
        dispatch(
          callApi(
            `/api/products/getproduct/${productId}/`,
            "GET",
            {},
            {
              SUCESS: PRODUCT_DETAILS_SUCESS,
              FAIL: PRODUCT_DETAILS_FAIL,
              REQUEST: PRODUCT_DETAILS_REQUEST,
            }
          )
        );
        if (successGetDetails) {
          setProduct(productDeta);
        }
      }
    }
  }, [productId, successGetDetails, success]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const productData = new FormData();
    productData.append("name", product.name);
    productData.append("price", product.price);
    productData.append("countInStock", product.countInStock);
    productData.append("description", product.description);
    productData.append("categorie", categorieId);
    productData.append("image", image);
    productData.append("updateImage", updateImage);
    dispatch(
      callApi(
        `/api/products/update/${productId}/`,
        "PUT",
        productData,
        {
          SUCESS: PRODUCT_UPDATE_SUCESS,
          FAIL: PRODUCT_UPDATE_FAIL,
          REQUEST: PRODUCT_UPDATE_REQUEST,
        },
        true
      )
    );
  };
  useEffect(() => {
    if (!userInfo?.isAdmin) history.push("/");
  }, [userInfo]);
  return (
    <Container className="form-container" style={{ minHeight: "80vh" }}>
      {loadingDetails || loadingCategorie ? (
        <Loader />
      ) : errorDetails ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Link to="/admin/products/">
            <Button variant="warning">Regresar</Button>
          </Link>
          <h1>Editar producto</h1>
          <span className="text-dark">
            Llena los campos correspondientes para actualizar tu producto
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
                value={product?.name}
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
                value={product?.description}
                required
              />
            </Form.Group>
            <Form.Group
              name="categorie"
              controlId="categorie"
              onChange={handleChange}
            >
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                as="select"
                type="text"
                onChange={(e) => setCategorieId(e.target.value)}
              >
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
                value={product?.price}
              />
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Cantidad en stock</Form.Label>
              <Form.Control
                name="countInStock"
                type="number"
                placeholder="Ingresa la cantidad en stock"
                onChange={handleChange}
                value={product?.countInStock}
              />
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Imagen</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresa la imagen"
                value={product?.img}
                readOnly
              ></Form.Control>
              <Form.File
                id="image-file"
                label="Elegir imagen"
                custom
                onChange={(e) => {
                  setImage(e.target.files[0]);
                  setUpdateImage(true);
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
        </>
      )}
    </Container>
  );
}
