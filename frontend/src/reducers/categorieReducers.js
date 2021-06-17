import {CATEGORIE_DETAILS_FAIL, CATEGORIE_REGISTER_FAIL, CATEGORIE_REGISTER_REQUEST, CATEGORIE_REGISTER_SUCESS} from '../constants/categorieConstants'
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
      default:
        return state;
    }
  };
  