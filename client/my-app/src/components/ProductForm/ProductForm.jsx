import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Input,
} from "reactstrap";
const ProductForm = ({ onSubmit, submitFlag, key, products }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownTitle, setDropdownTitle] = React.useState("");
  const [product, setProduct] = useState("");
  const [cantVend, setCantVend] = useState("");
  const [cantProd, setCantProd] = useState("");
  const dropdownToggle = () => setDropdownOpen((prevState) => !prevState);

  useEffect(() => {
    console.log(submitFlag);
    if (submitFlag) {
      onSubmit({ product, cantVend, cantProd });
    }
  }, [submitFlag]);

  return (
    <div>
      <Row key={key} className="mb-3">
        <Col xs={4} sm={4} md={4} lg={4}>
          <Dropdown isOpen={dropdownOpen} toggle={dropdownToggle}>
            <DropdownToggle
              className="dropdown mr-5"
              caret
              outline
              color="secondary"
              style={{ backgroundColor: "#fff" }}
            >
              {dropdownTitle ? dropdownTitle : "Producto"}
            </DropdownToggle>
            <DropdownMenu>
              {products.map((p) => {
                return (
                  <DropdownItem
                    key={p["products.id"]}
                    onClick={(e) => {
                      setDropdownTitle(p["products.denominacion"]);
                      setProduct(e.target.value);
                    }}
                    value={p["products.id"]}
                  >
                    {p["products.denominacion"]}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          <Input
            value={cantVend}
            placeholder="Cantidad Vendidad"
            onChange={(e) => {
              setCantVend(e.target.value);
            }}
          />
        </Col>
        <Col xs={4} sm={4} md={4} lg={4}>
          <Input
            value={cantProd}
            placeholder="Cantidad Producida"
            onChange={(e) => {
              setCantProd(e.target.value);
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProductForm;
