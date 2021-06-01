import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import RegimenForm from "./components/RegimenForm/RegimenForm";
import "antd/dist/antd.css";
import CreateProductForm from "./components/CreateProductForm/CreateProductForm";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  Form,
  Button,
  FormGroup,
  Input,
  Label,
  DropdownMenu,
} from "reactstrap";
import { notification, message } from "antd";
import axios from "axios";
const initialState = {
  cuit: "",
  error: "",
};
function App() {
  const [open, setOpen] = useState(false);
  const [inputCuit, setInputCuit] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [createProduct, setCreateProduct] = useState(false);

  const handleCuit = async () => {
    setError("");

    if (inputCuit) {
      if (inputCuit.length !== 11) {
        setError("el cuit debe ser numerico y de 11 caracteres");
      }
      if (!error) {
        const res = await axios.get(`http://localhost:3045/empresas/${inputCuit}`);
        console.log(res.data);
        if (res.data.length > 0) {
          setProducts(res.data);
          setOpen(true);
        } else {
          setError("El cuit ingresado no tiene productos");
        }
      }
    }
  };

  const filterProducts = (selectedProducts) => {
    selectedProducts.forEach((p) => {
      const result = products.filter((prod) => p.ean == prod["products.ean"]);
      return console.log(result);
    });
  };
  return (
    <div className="App">
      <Header></Header>
      <h1>20410810205</h1>
      <Container>
        <div>
          <Row className="cuit-input">
            <Col className="mt-1" xs={4} sm={4} md={4} lg={4} xl={4}>
              <Input
                className="mb-2"
                name="cuit"
                type="text"
                placeholder="Cuit"
                onChange={(e) => {
                  setInputCuit(e.target.value);
                }}
              />
              {error ? <div style={{ color: "red" }}>{error}</div> : null}
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <Button onClick={handleCuit}>Send</Button>
            </Col>
            <Col xs={4} sm={4} md={4} lg={4} xl={4}>
              <Button onClick={() => setCreateProduct(true)}>Crear Producto</Button>
            </Col>
          </Row>
        </div>
        {createProduct ? <CreateProductForm cuit={inputCuit} /> : null}
        {open ? (
          <RegimenForm
            products={products}
            filterProducts={filterProducts}
            cuit={inputCuit}
          ></RegimenForm>
        ) : (
          ""
        )}
      </Container>
    </div>
  );
}

export default App;
