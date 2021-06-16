import {
  PRODUCT_REGISTER_FAIL,
  PRODUCT_REGISTER_REQUEST,
  PRODUCT_REGISTER_SUCESS,
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
    default:
      return state;
  }
};
