import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCESS,
} from "../constants/orderConstants";
export const orderCreateReducer = (
  state = { loading: false, error: null, order: null },
  action
) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true, success: false };
    case ORDER_CREATE_SUCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ORDER_CREATE_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};
