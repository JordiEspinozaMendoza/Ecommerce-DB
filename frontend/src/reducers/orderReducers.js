import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_RESET,
  ORDER_DETAILS_SUCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_RESET,
  ORDER_LIST_SUCESS,
  ORDER_UPDATE_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_RESET,
  ORDER_UPDATE_SUCESS,
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
export const orderDetailsReducer = (
  state = { loading: false, error: null, order: null },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true, success: false };
    case ORDER_DETAILS_SUCESS:
      return {
        loading: false,
        success: true,
        order: action.payload.order,
        items: action.payload.items,
      };
    case ORDER_DETAILS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ORDER_DETAILS_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};
export const orderListReducer = (
  state = { loading: false, error: null, orders: null },
  action
) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true, success: false };
    case ORDER_LIST_SUCESS:
      return { loading: false, success: true, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ORDER_LIST_RESET:
      return { loading: false, success: false, error: null, orders: null };
    default:
      return state;
  }
};
export const orderUpdateReducer = (
  state = { loading: false, error: null, order: null },
  action
) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return { loading: true, success: false };
    case ORDER_UPDATE_SUCESS:
      return { loading: false, success: true, order: action.payload };
    case ORDER_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case ORDER_UPDATE_RESET:
      return { loading: false, success: false, error: null, order: null };
    default:
      return state;
  }
};
