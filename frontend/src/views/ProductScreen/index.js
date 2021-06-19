//React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
//Components
import ProductDetails from "../../components/ProductDetails";
import ProductsList from "../../components/ProductsList";
import Loader from "../../components/Loader";
//api
import { callApi } from "../../api";
//Constants
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCESS,
} from "../../constants/productConstants";

export default function ProductScreen(history) {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //GET
  useEffect(() => {
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
  }, [userInfo, history]);

  const id = parseInt(useParams()["idProduct"], 10);
  const selectedProduct = products?.find((prod) => prod["id"] === id);
  return (
    <>
      {loading ? (
        <Container style={{ minHeight: "100vh", paddingTop: "5rem" }}>
          <Loader />
        </Container>
      ) : products && selectedProduct ? (
        <Container
          style={{
            minHeight: "70vh",
            paddingTop: "1rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ProductDetails product={selectedProduct} />
        </Container>
      ) : (
        <></>
      )}

      {/* {selectedProduct ? (
        <Container style={{ minHeight: "60vh"}}>
          <ProductsList style={{display: "flex", justifyContent: "center", alignItems: "center", height:"100%"}}
            products={products?.filter(
              (prod) =>
                prod["categorie"] === selectedProduct["categorie"] &&
                prod !== selectedProduct
            )}
          />
        </Container>
      ) : !loading ? (
        <>Producto no encontrado</>
      ) : (
        <></>
      )} */}
    </>
  );
}
