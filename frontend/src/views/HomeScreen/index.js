import Header from "../../components/Header";
import ProductsList from "../../components/ProductsList";
import AllProducts from "../../components/AllProducts";

export default function HomeScreen() {
  return (
    <>
      <Header/>
      <AllProducts />
      <ProductsList />
    </>
  );
}
