import React from "react";
import "./header.css";
import { Container, Row, Col, Button, Input, ModalHeader } from "reactstrap";

const Header = () => {
  return (
    <Row className="header">
      <Col>
        <span style={{ color: "#fff", fontSize: "30px" }}>Empresas del Sector Comercio</span>{" "}
      </Col>
    </Row>
  );
};

export default Header;
