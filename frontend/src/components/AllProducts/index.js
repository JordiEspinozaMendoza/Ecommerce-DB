//React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
//Components
import ProductsList from "../ProductsList";
import Loader from "../Loader";
//api
import { callApi } from "../../api";
//Constants
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCESS,
} from "../../constants/productConstants";
import {
  CATEGORIE_LIST_REQUEST,
  CATEGORIE_LIST_SUCESS,
  CATEGORIE_LIST_FAIL,
} from "../../constants/categorieConstants";

export default function ProductScreen(history) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading: loadingProd, products, error: errorProd } = productList;

  const categorieList = useSelector((state) => state.categorieList);
  const { loading: loadingCat, categories, error: errorCat } = categorieList;

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
  }, [userInfo, history]);
  return (
    <>
      {loadingCat || loadingProd ? (
        <Container style={{minHeight:"80vh", paddingTop: "5rem"}}>
          <Loader />
        </Container>
      ) : (
        <Container>
          {categories?.map((cat) => {
            return (
              <>
                <h3 className="mt-3 border-top border-warning border-3 pt-2 rounded">
                  {cat.name}
                </h3>
                <ProductsList
                  products={products?.filter(
                    (prod) => prod["categorie"] === cat.id
                  )}
                />
              </>
            );
          })}
        </Container>
      )}
    </>
  );
}
