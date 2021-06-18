//React
import React, { useState, useEffect, Component } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Col, Row, Card, Button, Container} from "react-bootstrap";
import { useParams } from 'react-router-dom';
//Components
import ProductDetails from "../../components/ProductDetails";
import ProductsList from "../../components/ProductsList";
import getRandomImage from "../../constants/getRandomImage";
import ProductPanel from "../../components/ProductPanel";
import Loader from "../../components/Loader";
//api
import { callApi } from "../../api";
//Constants
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCESS,
} from "../../constants/productConstants";

/*
"id": queries[0],
"categorie": queries[1],
"name": queries[2],
"description": queries[3],
"price": queries[4],
"countInStock": queries[5],
"img": queries[6],
*/

const initialState = {
  id: "",
}

export default function ProductScreen(history) {

  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
    
  const id = 4//useParams()["idProduct"];
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

  // console.log(products);
  //const selectedProduct = products
  //const selectedProduct = products.read(products.match.params.idProduct)
  console.log(products);
  console.log(id);
  console.log(products?.find((prod) => prod.id = id));
  

  return (
    <>
      {products && <ProductDetails product={products?.find(prod => prod.id = id)}/>}
      
      <ProductsList />
    </>
  );
}