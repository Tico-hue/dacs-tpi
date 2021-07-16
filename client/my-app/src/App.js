import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header/Header";
import RegimenForm from "./components/RegimenForm/RegimenForm";
import "antd/dist/antd.css";
import CreateProductForm from "./components/CreateProductForm/CreateProductForm";
import { Container, Row, Col, Button, Input, ModalHeader } from "reactstrap";
import { notification, message, Descriptions } from "antd";
import { Link, useHistory, useLocation } from "react-router-dom";

import axios from "axios";

function App() {
  const [open, setOpen] = useState(false);
  const [inputCuit, setInputCuit] = useState("");
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [createProduct, setCreateProduct] = useState(false);
  const [notification, setNotification] = useState({ open: false, message: "" });

  const history = useHistory();

  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const handleNotification = async () => {
    setNotification({ open: false, message: "" });
    console.log(localStorage.getItem("token"));
    const notif = await axios.get(`https://api-secretaria-g6.herokuapp.com/status/`, {
      headers: { Authorization: localStorage.getItem("token") },
    });
    const notif1 = notif.data;
    if (notif1.data.notif1ication) {
      setNotification({ open: true, message: notif1.data.notif1ication.message });
    } else {
      setNotification({ open: true, message: notif1.data.alerts[0].title });
    }
    setNotification({ open: true, message: notif1.data.notification["message"] });
  };

  useEffect(() => {
    let cuit = "";
    if (query.get("cuit")) {
      cuit = query.get("cuit");
      setInputCuit(cuit);
    }
  }, [history]);
  const handleCuit = async () => {
    setError("");
    let cuit = "";
    if (query.get("cuit")) {
      cuit = query.get("cuit");
      console.log(cuit);
    }

    const res = await axios.get(`http://localhost:3045/empresas/${cuit}`);
    console.log(res.data);
    if (res.data) {
      setProducts(res.data);
      setOpen(true);
    } else {
      setError("El cuit ingresado no tiene productos");
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
      <Container>
        <div>
          <Row className="cuit-input">
            <Col className="mb-2" xs={12} sm={12} md={3} lg={3} xl={3}>
              <Button onClick={handleCuit}>Cargar Regimen</Button>
            </Col>
            <Col className="mb-2" xs={12} sm={12} md={3} lg={3} xl={3}>
              <Button onClick={() => setCreateProduct(true)}>Crear Producto</Button>
            </Col>
            <Col className="mb-2" xs={12} sm={12} md={3} lg={3} xl={3}>
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
        ) : null}
      </Container>
    </div>
  );
}

export default App;
