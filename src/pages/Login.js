import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import Functions from "../utils/Functions";
import Services from "../utils/Services";

const uuidv4 = require('uuid/v4');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      errorMessage: "",
      isLoading: false,
      success: false,
      successMessage: "",
      messageSent: false,
    };

    this.function = new Functions(this);
    this.services = new Services(this);
  }

  componentDidMount() {
    localStorage.clear();
  }

  handleLogin = async (event) => {
    event.preventDefault();
    /* Generate a random GUID to use as a token */
    let id = uuidv4();
    sessionStorage.setItem('authToken', id);
    window.location.href = '/app/jokes'
  };

  render() {
    return (
      <div className="auth-main-content auth-bg-image">
        <div className="d-table">
          <div className="d-tablecell">
            <div className="auth-box">
              <Row>
                <Col md={12} xs={12}>
                  <div className="form-content">
                    <h1 className="heading">Generate Token</h1>
                    {this.state.error || this.state.success ? (
                      <div
                        className={
                          this.state.error
                            ? "alert alert-danger show-error"
                            : "alert alert-success"
                        }
                      >
                        <strong id="error text-center">
                          {" "}
                          {this.state.error
                            ? this.state.errorMessage
                            : this.state.successMessage}{" "}
                        </strong>
                      </div>
                    ) : (
                      ""
                    )}
                    <div className="text-center">
                      <Button
                        variant={this.state.isLoading ? "primary" : "success"}
                        type="submit"
                        size="sm"
                        onClick={this.handleLogin}
                      >
                        {this.state.isLoading
                          ? "Generating..."
                          : "Generate Token"}
                      </Button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
