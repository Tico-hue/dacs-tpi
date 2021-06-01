import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import RegimenForm from "./components/RegimenForm/RegimenForm";
import "antd/dist/antd.css";
import CreateProductForm from "./components/CreateProductForm/CreateProductForm";
import { Container, Row, Col, Button, Input, ModalHeader } from "reactstrap";
import { notification, message, Descriptions } from "antd";
import axios from "axios";

function App() {
  const [open, setOpen] = useState(false);
  const [inputCuit, setInputCuit] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [createProduct, setCreateProduct] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "" });

  const handleNotification = async () => {
    setNotification({ open: false, message: "" });
    const estado = await axios.get(`http://localhost:3050/notifications/${inputCuit}`);
    const res = estado.data;
    if (res.notification.status) {
      setNotification({ open: true, message: res.notification.message });
    } else {
      setNotification({ open: true, message: [res.notification, res.alerts] });
    }
    setNotification({ open: true, message: estado.notification["message"] });
  };
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
            <Col className="mt-1" xs={3} sm={3} md={3} lg={3} xl={3}>
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
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <Button onClick={handleCuit}>Cargar Regimen</Button>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <Button onClick={() => setCreateProduct(true)}>Crear Producto</Button>
            </Col>
            <Col xs={3} sm={3} md={3} lg={3} xl={3}>
              <Button onClick={handleNotification}>Consultar Estado</Button>
            </Col>
          </Row>
        </div>
        {notification.open ? <div>{notification.message}</div> : null}
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
