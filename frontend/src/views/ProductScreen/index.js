//React
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
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

export default function ProductScreen({ history }) {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const addToCartHandler = (e) => {
    userInfo
      ? history.push(`/cart/${selectedProduct.id}?qty=${qty}`)
      : history.push("/login");
  };
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
          <ProductDetails product={selectedProduct}>
            <div className="p-3">
              {selectedProduct?.countInStock > 0 ? (
                <>
                  <h6>Cantidad a comprar <i class="fas fa-shopping-basket"></i></h6>
                  <Form.Control
                    as="select"
                    className="mb-3"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                  >
                    {[...Array(selectedProduct.countInStock).keys()].map(
                      (x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      )
                    )}
                  </Form.Control>
                  <button
                    type="button"
                    onClick={addToCartHandler}
                    className="btn btn-primary"
                    disabled={selectedProduct?.countInStock === 0}
                  >
                    Añadir al carro <i className="fas fa-shopping-cart"></i>
                  </button>
                </>
              ) : (
                <h6>No hay productos en stock</h6>
              )}
            </div>
          </ProductDetails>
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
