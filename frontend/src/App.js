import { HashRouter as Router, Route } from "react-router-dom";

import HomeScreen from "./views/HomeScreen";
import NavigationBar from "./components/NavBar";
import Footer from "./components/Footer";
import "./assets/css/styles.css"
function App() {
  return (
    <Router>
      <NavigationBar />
      <Route path="/" component={HomeScreen}></Route>
      <Footer/>
    </Router>
  );
}

export default App;
