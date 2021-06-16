import { HashRouter as Router, Route } from "react-router-dom";

import HomeScreen from "./views/HomeScreen";
import RegisterScreen from "./views/RegisterScreen";
import ProductEditScreen from "./views/ProductEditScreen";
import LoginScreen from "./views/LoginScreen";
import ProfileScreen from "./views/ProfileScreen";

import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import "./assets/css/styles.css"
function App() {
  return (
    <Router>
      <NavigationBar />
      <ScrollToTop/>
      <Route path="/" component={HomeScreen} exact/>
      <Route path="/register/" component={RegisterScreen} exact/>
      <Route path="/login/" component={LoginScreen} exact/>
      <Route path="/profile/" component={ProfileScreen} exact/>
      <Route path="/admin/product/edit/" component={ProductEditScreen} exact/>
      <Footer/>
    </Router>
  );
}

export default App;
