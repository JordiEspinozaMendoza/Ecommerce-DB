import {
  CATEGORIE_DETAILS_FAIL,
  CATEGORIE_DETAILS_RESET,
  CATEGORIE_DETAILS_SUCESS,
  CATEGORIE_DETAILS_REQUEST,
  CATEGORIE_LIST_FAIL,
  CATEGORIE_LIST_REQUEST,
  CATEGORIE_LIST_SUCESS,
  CATEGORIE_REGISTER_FAIL,
  CATEGORIE_REGISTER_REQUEST,
  CATEGORIE_REGISTER_RESET,
  CATEGORIE_REGISTER_SUCESS,
  CATEGORIE_UPDATE_REQUEST,
  CATEGORIE_UPDATE_SUCESS,
  CATEGORIE_UPDATE_FAIL,
  CATEGORIE_UPDATE_RESET,
} from "../constants/categorieConstants";
export const categorieRegisterReducer = (
  state = { loading: false, error: null, product: null },
  action
) => {
  switch (action.type) {
    case CATEGORIE_REGISTER_REQUEST:
      return { loading: true, success: false };
    case CATEGORIE_REGISTER_SUCESS:
      return { loading: false, success: true, categorie: action.payload };
    case CATEGORIE_REGISTER_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORIE_REGISTER_RESET:
      return { loading: false, success: false, error: null };
    default:
      return state;
  }
};
export const categorieListReducer = (
  state = { loading: false, error: null, categories: null },
  action
) => {
  switch (action.type) {
    case CATEGORIE_LIST_REQUEST:
      return { loading: true, success: false };
    case CATEGORIE_LIST_SUCESS:
      return { loading: false, success: true, categories: action.payload };
    case CATEGORIE_LIST_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};
export const categorieDetailsReducer = (
  state = { loading: false, error: null, categorie: null },
  action
) => {
  switch (action.type) {
    case CATEGORIE_DETAILS_REQUEST:
      return { loading: true, success: false };
    case CATEGORIE_DETAILS_SUCESS:
      return { loading: false, success: true, categorie: action.payload };
    case CATEGORIE_DETAILS_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORIE_DETAILS_RESET:
      return { loading: false, success: false, error: null, categorie: null };
    default:
      return state;
  }
};
export const categorieUpdateReducer = (
  state = { loading: false, error: null, categorie: null },
  action
) => {
  switch (action.type) {
    case CATEGORIE_UPDATE_REQUEST:
      return { loading: true, success: false };
    case CATEGORIE_UPDATE_SUCESS:
      return { loading: false, success: true, categorie: action.payload };
    case CATEGORIE_UPDATE_FAIL:
      return { loading: false, success: false, error: action.payload };
    case CATEGORIE_UPDATE_RESET:
      return { loading: false, success: false, error: null, categorie: null };
    default:
      return state;
  }
};
