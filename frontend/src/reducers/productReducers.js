import {
  PRODUCT_REGISTER_FAIL,
  PRODUCT_REGISTER_REQUEST,
  PRODUCT_REGISTER_SUCESS,
  PRODUCT_REGISTER_RESET,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_RESET,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_RESET,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_RESET,
  PRODUCT_SEARCH_SUCESS,
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
export const productUpdateReducer = (
  state = { loading: false, error: null, product: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true, success: false };
    case PRODUCT_UPDATE_SUCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};
export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, success: false };
    case PRODUCT_DETAILS_SUCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return { loading: false, success: false, error: null, product: null };
    default:
      return state;
  }
};
export const productSearchReducer = (
  state = { loading: false, error: null, products: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return { loading: true, success: false };
    case PRODUCT_SEARCH_SUCESS:
      return { loading: false, success: true, products: action.payload };
    case PRODUCT_SEARCH_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PRODUCT_SEARCH_RESET:
      return state;
    default:
      return state;
  }
};
export const productListReducer = (
  state = { loading: false, error: null, products: null },
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
      return state;
    default:
      return state;
  }
};
export const productDeleteReducer = (
  state = { loading: false, error: null, success: null },
  action
) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true, success: false };
    case PRODUCT_DELETE_SUCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return state;
    default:
      return state;
  }
};
