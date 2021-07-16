import React from "react";
import "./header.css";
import { Row, Col, Container } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, connect } from "react-redux";

const Header = ({ isLogged }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "USER_REGISTER", payload: false });
    history.push("/home");
  };
  return (
    <Container>
      <Row className="header">
        <Col className="header-box" sm={12} md={12}>
          <div>
            <span style={{ color: "#fff", fontSize: "30px" }}>Empresas del Sector Comercio</span>{" "}
          </div>
          <div className="header-buttons">
            {isLogged ? (
              <div onClick={handleLogout}>
                <a>Log out</a>
              </div>
            ) : (
              <div>
                <div>
                  <Link to="/sign-up">
                    <a>Sign up</a>
                  </Link>
                </div>
                <div>
                  <Link to="/login">
                    <a>Log in</a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => ({ isLogged: state.isLogged });
export default connect(mapStateToProps)(Header);
