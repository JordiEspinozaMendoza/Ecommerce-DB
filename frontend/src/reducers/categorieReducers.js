import {
  CATEGORIE_DETAILS_FAIL,
  CATEGORIE_LIST_FAIL,
  CATEGORIE_LIST_REQUEST,
  CATEGORIE_LIST_SUCESS,
  CATEGORIE_REGISTER_FAIL,
  CATEGORIE_REGISTER_REQUEST,
  CATEGORIE_REGISTER_RESET,
  CATEGORIE_REGISTER_SUCESS,
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
  state = { loading: false, error: null, product: null },
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
