import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_RESET,
  USER_LIST_REQUEST,
  USER_LIST_SUCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCESS,
  USER_DELETE_FAIL,
  USER_DELETE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  USER_LOGIN_RESET,
} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCESS:
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { loading: false, success: true, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_LOGIN_RESET:
      return { loading: false, success: false, error: null };
    case USER_LOGOUT:
      localStorage.removeItem("userInfo");
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case USER_DETAILS_SUCESS:
      return { loading: false, user: action.payload };
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = { users: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case USER_UPDATE_PROFILE_SUCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true };
    case USER_LIST_SUCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_RESET:
      return { users: null, success: false, loading: false, error: null };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_DELETE_RESET:
      return { loading: false, error: null, success: null };

    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true };
    case USER_UPDATE_SUCESS:
      return { loading: false, success: true, user: action.payload };
    case USER_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };

    case USER_UPDATE_RESET:
      return { loading: false, error: null, success: false };

    default:
      return state;
  }
};
