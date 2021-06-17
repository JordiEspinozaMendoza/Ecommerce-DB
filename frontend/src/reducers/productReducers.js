import {
  PRODUCT_REGISTER_FAIL,
  PRODUCT_REGISTER_REQUEST,
  PRODUCT_REGISTER_SUCESS,
  PRODUCT_REGISTER_RESET,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_RESET
} from "../constants/productConstants";

export const productRegisterReducer = (
  state = { loading: false, error: null, product: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_REGISTER_REQUEST:
      return { loading: true, success: false };
    case PRODUCT_REGISTER_SUCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_REGISTER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PRODUCT_REGISTER_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};
export const productListReducer = (
  state = { loading: false, error: null, product: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, success: false };
    case PRODUCT_LIST_SUCESS:
      return { loading: false, success: true, products: action.payload };
    case PRODUCT_LIST_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PRODUCT_LIST_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};
