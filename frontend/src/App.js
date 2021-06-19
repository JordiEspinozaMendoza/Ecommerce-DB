//React
import { HashRouter as Router, Route } from "react-router-dom";

//Screens
import HomeScreen from "./views/HomeScreen";
import RegisterScreen from "./views/RegisterScreen";
import ProductRegisterScreen from "./views/ProductRegisterScreen";
import ProductEditScreen from "./views/ProductEditScreen";
import ProductScreen from "./views/ProductScreen";
import ProductsScreen from "./views/ProductsScreen";
import ProductListScreen from "./views/ProductListScreen";
import LoginScreen from "./views/LoginScreen";
import ProfileScreen from "./views/ProfileScreen";
import EditCategorie from "./views/EditCategorie";
import RegisterCategorie from "./views/RegisterCategorie";
import CategorieScreen from "./views/CategorieScreen";
import CategoriesScreen from "./views/CategoriesScreen";

//Components
import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

//Styles
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
      <Route path="/products/" component={ProductsScreen} exact/>

      {/* PUBLIC CATEGORIE PATHS */}
      <Route path="/categories/:name/" component={CategorieScreen} exact/>

      {/* ADMIN PATHS */}
      <Route path="/admin/categories/" component={CategoriesScreen} exact/>
      <Route path="/admin/categories/edit/:id/" component={EditCategorie} exact/>
      <Route path="/admin/categories/register/" component={RegisterCategorie} exact/>
      <Route path="/admin/products/register/" component={ProductRegisterScreen} exact/>
      <Route path="/admin/products/edit/:id/" component={ProductEditScreen} exact/>
      <Route path="/admin/products/" component={ProductListScreen} exact/>

      <Footer/>
    </Router>
  );
}

export default App;
