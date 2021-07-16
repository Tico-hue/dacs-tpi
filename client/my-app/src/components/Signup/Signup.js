import React, { useState } from "react";
import "./Signup.css";
import { Container, Row, Col } from "reactstrap";
import { Formik, Field, Form } from "formik";
import axios from "../../axios";
import { useHistory } from "react-router-dom";

function validateEmail(email) {
  const regex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
}
function validatePassword(password) {
  // Al menos: un número, una minúscula, una mayúscula y seis caracteres
  if (password.length >= 6) {
    return true;
  }
  return false;
}
const Signup = () => {
  // fields errors
  const [errLastName, setErrLastName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errName, setErrName] = useState("");
  const [errPass, setErrPass] = useState("");
  const history = useHistory();

  const validate = async (values) => {
    // restart errMessage
    setErrName("");
    setErrLastName("");
    setErrEmail("");
    setErrPass("");

    //Commum errors
    const requiredField = ["Campo Obligatorio", "Required field"];

    let errorsCount = 0;

    if (values.name === "" || values.name.length === 0) {
      const msgFirstName = "";
      setErrName(msgFirstName);
      errorsCount++;
    }
    if (values.lastName === "" || values.lastName.length === 0) {
      const msgLastName = "";
      setErrLastName(msgLastName);
      errorsCount++;
    }
    if (values.email === "" || values.email.length === 0) {
      const msgEmail = "";
      setErrEmail(msgEmail);
      errorsCount++;
    } else {
      if (!validateEmail(values.email)) {
        const msgEmail = "Correo electrónico inválido";
        setErrEmail(msgEmail);
        errorsCount++;
      }

      if (values.password === "" || values.password.length === 0) {
        const msgPass = "";
        setErrPass(msgPass);
        errorsCount++;
      } else {
        if (!validatePassword(values.password)) {
          const msgPass = "Al menos: seis caracteres";
          setErrPass(msgPass);
          errorsCount++;
        }
      }

      // console.log(errorsCount);
      if (errorsCount > 0) {
        return false;
      } else {
        return true;
      }
    }
  };

  return (
    <div>
      <div className="sign-up-container">
        <Container>
          <div className="sign-up-form-box">
            <Row className="sign-up-form-box-center">
              <Col sm={8} md={8}>
                <div className="bravo-box">
                  <div style={{ width: "90%", margin: "auto" }}>
                    <Row className="sign-up-form">
                      <Formik
                        initialValues={{
                          cuit: "",
                          razonSocial: "",
                          industria: "",
                          email: "",
                          password: "",
                          telefono: "",
                          ciudad: "",
                        }}
                        onSubmit={async (values, actions) => {
                          const res = await axios.post(
                            "https://ministeriodesarrolloproductivo.herokuapp.com/api/signup",
                            values,
                          );
                          const res1 = await axios.post(`http://localhost:3045/empresas`, {
                            cuit: values.cuit,
                            razon_social: values.razonSocial,
                          });
                          console.log(res);
                          if (res.status == 200) {
                            localStorage.removeItem("token");
                            history.push("/login");
                          }
                        }}
                      >
                        <Form>
                          <Col className="sign-up-form-input" xs={12} sm={12} md={12} lg={12}>
                            <Field type="number" name="cuit" placeholder="Cuit" />
                            {/* <div className="error-register">{errEmail}</div> */}
                          </Col>
                          <Col className="sign-up-form-input" xs={12} sm={12} md={12} lg={12}>
                            <Field type="text" name="razonSocial" placeholder="Razon social" />
                            {/* <div className="error-register">{errEmail}</div> */}
                          </Col>
                          <Col className="sign-up-form-input" xs={12} sm={12} md={12} lg={12}>
                            <Field type="text" name="industria" placeholder="Industria" />
                            {/* <div className="error-register">{errEmail}</div> */}
                          </Col>

                          <Col className="sign-up-form-input" xs={12} sm={12} md={12} lg={12}>
                            <Field type="email" name="email" placeholder="Email" />
                            {/* <div className="error-register">{errEmail}</div> */}
                          </Col>
                          <Col className="sign-up-form-input" xs={12} sm={12} md={12} lg={12}>
                            <Field type="number" name="tel" placeholder="telefono" />
                            {/* <div className="error-register">{errEmail}</div> */}
                          </Col>
                          <Col className="sign-up-form-input" xs={12} sm={12} md={12} lg={12}>
                            <Field type="text" name="ciudad" placeholder="Ciudad" />
                            {/* <div className="error-register">{errEmail}</div> */}
                          </Col>
                          <Col className="sign-up-form-input" sm={12} md={12}>
                            <Field type="password" name="password" placeholder="Crear Contraseña" />
                            <div className="error-register">{errPass}</div>
                          </Col>
                          <Col sm={12} md={12}>
                            <button className="sign-up-form-button" type="submit">
                              Registrarse
                            </button>
                          </Col>
                        </Form>
                      </Formik>

                      <Row>
                        <div>
                          <a style={{ fontSize: "16px" }} href="/login">
                            ¿Ya tienes una cuenta? Iniciar sesión
                          </a>
                        </div>
                      </Row>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Signup;
