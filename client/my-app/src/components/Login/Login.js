import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import { Container, Row, Col } from "reactstrap";
import { useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";
import axios from "axios";

const Login = ({ isLogged }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const query = new URLSearchParams(location.search);
  const [flag, setFlag] = useState(false);
  const [cuit, setCuit] = useState(0);

  useEffect(() => {
    window.scroll(0, 0);

    if (localStorage.getItem("token")) {
      dispatch({ type: "USER_LOGGED", payload: true });
    }
    if (isLogged) {
      const params = new URLSearchParams();
      params.append("cuit", cuit);
      history.push({ pathname: "/home", search: params.toString() });
    }
  }, [dispatch, isLogged, history, flag, cuit]);

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
                          email: "",
                          password: "",
                        }}
                        onSubmit={async (values, actions) => {
                          const res = await axios.post(
                            "https://ministeriodesarrolloproductivo.herokuapp.com/api/login",
                            values,
                          );
                          if (res.status == 200) {
                            console.log(res.data);
                            setCuit(res.data.cuit);
                            localStorage.removeItem("token");
                            localStorage.setItem("token", res.headers.token);
                            setFlag(!flag);
                          }
                        }}
                      >
                        <Form>
                          <Col className="sign-up-form-input" xs={12} sm={12} md={12} lg={12}>
                            <Field type="email" name="email" placeholder="Email" />
                            {/* <div className="error-register">{errEmail}</div> */}
                          </Col>
                          <Col className="sign-up-form-input" sm={12} md={12}>
                            <Field type="password" name="password" placeholder="Crear Contraseña" />
                            {/* <div className="error-register">{errPass}</div> */}
                          </Col>
                          <Col sm={12} md={12}>
                            <button className="sign-up-form-button" type="submit">
                              Ingresar
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
const mapStateToProps = (state) => ({ isLogged: state.isLogged });
export default connect(mapStateToProps)(Login);
