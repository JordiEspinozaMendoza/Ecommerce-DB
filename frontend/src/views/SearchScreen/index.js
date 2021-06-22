//React
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
//Components
import ProductsList from "../../components/ProductsList";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
//api
import { callApi } from "../../api";
//Constants
import {
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCESS,
} from "../../constants/productConstants";

export default function SearchScreen({ match, location, history }) {
  let searchQuery = match.params.search;
  const dispatch = useDispatch();

  const productSearch = useSelector((state) => state.productSearch);
  const { loading, products, error } = productSearch;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //GET
  useEffect(() => {
    dispatch(
      callApi(
        `/api/products/search/${searchQuery}/`,
        "GET",
        {},
        {
          SUCESS: PRODUCT_SEARCH_SUCESS,
          FAIL: PRODUCT_SEARCH_FAIL,
          REQUEST: PRODUCT_SEARCH_REQUEST,
        }
      )
    );
  }, [userInfo, history, searchQuery]);
  return (
    <>
      {loading ? (
        <Container className="container-hard">
          <Loader />
        </Container>
      ) : products?.length === 0 ? (
        <Container style={{ height: "70vh" }}>
          <h3 className="mt-3 border-top border-warning border-3 pt-2 rounded">
            Resultados para {searchQuery}
          </h3>
          <Message variant="warning">
            No hay productos disponibles para esa búsqueda
          </Message>
        </Container>
      ) : (
        <Container className="">
          <h3 className="mt-3 border-top border-warning border-3 pt-2 rounded">
            Resultados para {searchQuery}
          </h3>
          <ProductsList products={products} />
        </Container>
      )}
    </>
  );
}
