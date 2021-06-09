import { Spinner } from "react-bootstrap";
export default function Loader() {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        height: "100px",
        width: "100px",
        display: "block",
        margin: "auto",
      }}
    />
  );
}
