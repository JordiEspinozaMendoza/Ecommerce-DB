import { HashRouter as Router, Route } from "react-router-dom";

import HomeScreen from "./views/HomeScreen";
import RegisterScreen from "./views/RegisterScreen";
import ProductRegisterScreen from "./views/ProductRegisterScreen";
import ProductScreen from "./views/ProductScreen";
import ProductListScreen from "./views/ProductListScreen";
import LoginScreen from "./views/LoginScreen";
import ProfileScreen from "./views/ProfileScreen";
import EditCategorie from "./views/EditCategorie";
import RegisterCategorie from "./views/RegisterCategorie";

import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./assets/css/styles.css"
function App() {
  return (
    <Router>
      <NavigationBar />
      <ScrollToTop/>
      {/* HOME PATH */}
      <Route path="/" component={HomeScreen} exact/>

      {/* USER PATHS */}
      <Route path="/register/" component={RegisterScreen} exact/>
      <Route path="/login/" component={LoginScreen} exact/>
      <Route path="/profile/" component={ProfileScreen} exact/>

      {/* PUBLIC PRODUCT PATHS */}
      <Route path="/product/:idProduct/" component={ProductScreen} exact/>
      <Route path="/products/" component={ProductScreen} exact/>

      {/* ADMIN PATHS */}
      <Route path="/admin/categories/edit/" component={EditCategorie} exact/>
      <Route path="/admin/categories/register/" component={RegisterCategorie} exact/>
      <Route path="/admin/products/register/" component={ProductRegisterScreen} exact/>
      <Route path="/admin/products/" component={ProductListScreen} exact/>

      <Footer/>
    </Router>
  );
}

export default App;
