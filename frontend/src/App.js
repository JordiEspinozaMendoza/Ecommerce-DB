import { HashRouter as Router, Route } from "react-router-dom";

import HomeScreen from "./views/HomeScreen";
import ProductEditScreen from "./views/ProductEditScreen";

import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./assets/css/styles.css"
function App() {
  return (
    <Router>
      <NavigationBar />
      <Route path="/" component={HomeScreen} exact/>
      <Route path="/admin/product/edit/" component={ProductEditScreen} exact/>
      <Footer/>
    </Router>
  );
}

export default App;
