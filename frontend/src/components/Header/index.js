import { Button } from "react-bootstrap";
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <div id="home-header">
      <h1 className="text-center">Encuentra herramientas, maquinaria, etc</h1>
      <Link to="/products/">
        <Button variant="warning">
          Ver productos
        </Button>
      </Link>
      
    </div>
  );
}
