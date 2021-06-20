import axios from "axios";
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstants";
import {
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCESS,
} from "../constants/productConstants";
import { callApi } from "../api";
import { useDispatch, useSelector } from "react-redux";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  console.log(id);
  const { data } = await axios.get(`/api/products/getproduct/${id}`);

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data?.id,
      name: data?.name,
      img: data?.img,
      countInStock: data?.countInStock,
      price: data?.price,
      qty: qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};
