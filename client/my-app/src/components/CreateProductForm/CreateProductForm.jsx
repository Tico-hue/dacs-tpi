import React, { useState } from "react";
import axios from "axios";
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
const CreateProductForm = ({ cuit }) => {
  const [deno, setDeno] = useState("");
  const [ean, setEan] = useState("");
  const [uMedida, setUMedida] = useState("");
  const [precioU, setPrecioU] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (deno && ean && uMedida) {
      const body = { cuit, deno, ean, uMedida, precioU };
      console.log(body);
      const res = await axios.post(`http://localhost:3045/products`, body);
      console.log(res);
    }
  };
  return (
    <div>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <FormGroup>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <Input
                placeholder="denominacion"
                onChange={(e) => {
                  setDeno(e.target.value);
                }}
                value={deno}
              ></Input>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <Input
                placeholder="codigo ean"
                onChange={(e) => {
                  setEan(e.target.value);
                }}
                value={ean}
              ></Input>
            </Col>{" "}
          </Row>
          <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <Input
                placeholder="precio unitario"
                onChange={(e) => {
                  setPrecioU(e.target.value);
                }}
                value={precioU}
              ></Input>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              <Input
                placeholder="unidad de medida"
                onChange={(e) => {
                  setUMedida(e.target.value);
                }}
                value={uMedida}
              ></Input>
            </Col>
          </Row>
        </FormGroup>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <Button type="submit" color="success">
              {" "}
              Crear
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateProductForm;
