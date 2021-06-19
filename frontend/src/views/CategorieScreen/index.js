//React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Container} from "react-bootstrap";
import { useParams } from 'react-router-dom';
//Components
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


export default function CategorieScreen(history) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loadingProd, products, errorProd } = productList;

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
  const catName = useParams()["name"];
  return(
    <>
      {loadingProd && <Loader/>}
      <Container className="">
        <h3 className="mt-3 border-top border-warning border-3 pt-2 rounded">{catName}</h3>
        <ProductsList products={products?.filter(prod => prod["nameCategorie"] === catName)}/>
      </Container>
    </>
  );
}