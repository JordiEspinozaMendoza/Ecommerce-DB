import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  productRegisterReducer,
  productListReducer,
  productUpdateReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import {
  categorieRegisterReducer,
  categorieListReducer,
  categorieDetailsReducer,
  categorieUpdateReducer,
} from "./reducers/categorieReducers";
import { cartReducer } from "./reducers/cartReducers";
import { orderCreateReducer } from "./reducers/orderReducers";
const reducer = combineReducers({
  //Reducers
  //users
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userDetails: userDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userUpdate: userUpdateReducer,
  userUpdate: userUpdateReducer,
  //Products
  productRegister: productRegisterReducer,
  productList: productListReducer,
  productUpdate: productUpdateReducer,
  productDetails: productDetailsReducer,
  //Categories
  categorieRegister: categorieRegisterReducer,
  categorieList: categorieListReducer,
  categorieDetails: categorieDetailsReducer,
  categorieUpdate: categorieUpdateReducer,
  //Cart
  cart: cartReducer,
  //order
  orderCreate: orderCreateReducer,
});
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;
const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: {
    userInfo: userInfoFromStorage,
  },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
