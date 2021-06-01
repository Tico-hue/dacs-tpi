import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Row,
  Col,
  Dropdown,
  Form,
  Input,
  DropdownToggle,
  DropdownItem,
  Label,
  Button,
  FormGroup,
  DropdownMenu,
} from "reactstrap";
import "./RegimenForm.scss";
import { notification } from "antd";
import ProductForm from "../ProductForm/ProductForm";
import axios from "axios";
import validator from "validator";

const RegimenForm = ({ filterProducts, cuit, products }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [flag, setFlag] = useState(false);
  const [productValues, setProductValues] = useState([]);
  const [forms, setForms] = useState([
    { CantidadVendida: "Cantidad Vendida", CantidadProducida: "Cantidad Producida" },
  ]);

  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState("");
  const [errorFecha, setErrorFecha] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFlag(true);
  };

  const sendRegimen = async (regimen) => {
    if (anio && mes && productValues.length !== 0) {
      const res = await axios.post("http://localhost:3045/empresas/", regimen);
      console.log(res);
    }
  };
  const formateRegimen = () => {
    setErrorFecha(null);
    if (mes && anio) {
      const fecha = `${anio}/${mes}/12`;
      if (!validator.isDate(fecha)) {
        setErrorFecha("fecha invalida");
        return;
      }
    }

    const regimen = { cuit: cuit, year: anio, month: mes, ventas: productValues };

    return regimen;
  };
  const getFormData = (data) => {
    let formateP = products.filter((p) => p["products.id"] == data.product);
    formateP = formateP[0];

    if (formateP) {
      formateP = {
        ean: formateP["products.codigo_ean"],
        denominacion: formateP["products.denominacion"],
        unidad_medida: formateP["products.unidad_medida"],
        candtidad_producida: data.cantProd,
        candtidad_vendida: data.cantVend,
        precio_venta: formateP["products.precio_unidad"],
      };
      setProductValues(productValues.filter((p) => p.ean !== formateP.ean));
      setProductValues((prevState) => [...prevState, formateP]);
    }

    setFlag(false);
  };
  useEffect(() => {
    if (productValues.ventas && productValues.ventas.length != 0) {
    }
    console.log(productValues, 1);
    filterProducts(productValues);
    console.log(productValues, 2);
    sendRegimen(formateRegimen());
    console.log(productValues, 3);
  }, [productValues]);

  const addForm = () => {
    const newForm = [
      ...forms,
      { CantidadVendida: "Cantidad Vendida", CantidadProducida: "Cantidad Producida" },
    ];
    setForms(newForm);
  };

  return (
    <React.Fragment>
      <Form
        className="mt-3"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Container>
          <FormGroup>
            <Label style={{ fontSize: "30px" }}>Periodo</Label>
            <Row>
              <Col>
                <Input
                  type="text"
                  placeholder="mes"
                  onChange={(e) => {
                    setMes(e.target.value);
                  }}
                />
              </Col>
              <Col>
                <Input
                  type="text"
                  placeholder="anio"
                  onChange={(e) => {
                    setAnio(e.target.value);
                  }}
                />
              </Col>
              {!errorFecha ? null : errorFecha}
            </Row>
          </FormGroup>
          <Row>
            <Col xs={12} sm={12} md={12} lg={12}>
              <div className="title">
                <h3>Productos</h3>
              </div>
            </Col>
          </Row>

          {forms.map((x, i) => (
            <React.Fragment>
              <ProductForm
                key={i}
                products={products}
                onSubmit={getFormData}
                submitFlag={flag}
              ></ProductForm>
            </React.Fragment>
          ))}

          <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <Button color="primary" onClick={addForm}>
                {" "}
                Agregar Producto
              </Button>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <Button color="success" type="submit">
                {" "}
                Enviar Regimen
              </Button>
            </Col>
          </Row>
        </Container>
      </Form>
    </React.Fragment>
  );
};

export default RegimenForm;
