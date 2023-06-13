import React from "react";
import { Breadcrumb, Col, Form, Button, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Functions from "../../utils/Functions";
import Services from "../../utils/Services";
import Navigation from "../../components/Navigation/Navigation";
import Footer from "../../components/Common/Footer";
import AlertDisplay from "../../components/Common/Alert";

const requiredFields = ["Author", "Body", "Title", "Views"];

class AddJoke extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenu: true,
      Author: "",
      Views: "",
      id: "",
      Title: "",
      Body: "",
      // eslint-disable-next-line react/no-unused-state
      jokeId: window.location.href.split("/").pop(),
    };
    this.function = new Functions(this);
    this.services = new Services(this);
  }

  componentDidMount() {
    this._isMounted = true;
    const id = window.location.href.split("/").pop();
    const disable =
      window.location.href.split("/")[4].split("-")[0] !== "create";
    if (
      sessionStorage.getItem("authToken") === undefined ||
      sessionStorage.getItem("authToken") === null
    ) {
      window.location.href = "/";
    } else {
      if (disable) {
        this.services.getJoke(id);
      }
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  submitForm = () => {
    const data = {
      Author: this.state.Author,
      Body: this.state.Body,
      Views: this.state.Views,
      Title: this.state.Title,
      createdAt: new Date(),
    };

    const updateData = {
      Author: this.state.Author,
      Body: this.state.Body,
      Views: this.state.Views,
      Title: this.state.Title,
      updatedAt: new Date(),
    };

    const disable =
      window.location.href.split("/")[4].split("-")[0] !== "create";
    const postData = disable ? updateData : data;

    const action = disable ? "put" : "post";
    this.services.submitAction(postData, "jokes", action);
  };

  render() {
    const disable =
      window.location.href.split("/")[4].split("-")[0] !== "create";

    return (
      <div className="page-wrapper">
        <Navigation onClick={this.function._onSideMenu} />
        <div
          className={`main-content d-flex flex-column ${
            this.state.sideMenu ? "" : "hide-sidemenu"
          }`}
        >
          <div className="main-content-header">
            <Breadcrumb>
              <Link to="/app/jokes" className="breadcrumb-item">
                Jokes
              </Link>
              <Breadcrumb.Item active>
                {disable ? "Review Joke" : "Create Joke"}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {this.state.error || this.state.success ? (
            <AlertDisplay
              error={this.state.error}
              success={this.state.success}
              successMessage={this.state.successMessage}
              errorMessage={this.state.errorMessage}
              closeAlert={this.function.closeAlert}
            />
          ) : (
            ""
          )}
          <div className="row">
            <div className="col-lg-12">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="panel-body">
                    <Form noValidate validated={this.state.validated}>
                      <Form.Row>
                        <Col xs={12} md={6}>
                          <Form.Group as={Row}>
                            <Form.Label column md="3">
                              Title
                            </Form.Label>
                            <Col md="9">
                              <Form.Control
                                autoComplete="off"
                                required
                                type="text"
                                value={this.state.Title}
                                id="Title"
                                name="Title"
                                onChange={this.function.handleChange}
                                isValid={this.state.Title !== ""}
                              />
                            </Col>
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Group as={Row}>
                            <Form.Label column md="3">
                              Body
                            </Form.Label>
                            <Col md="9">
                              <Form.Control
                                autoComplete="off"
                                type="text"
                                value={this.state.Body}
                                id="Body"
                                name="Body"
                                onChange={this.function.handleChange}
                                isValid={this.state.Body !== ""}
                              />
                            </Col>
                          </Form.Group>
                        </Col>
                      </Form.Row>
                      <Form.Row>
                        <Col xs={12} md={6}>
                          <Form.Group as={Row}>
                            <Form.Label column md="3">
                              Author
                            </Form.Label>
                            <Col md="9">
                              <Form.Control
                                autoComplete="off"
                                type="text"
                                value={this.state.Author}
                                id="Author"
                                name="Author"
                                onChange={this.function.handleChange}
                                isValid={this.state.Author !== ""}
                              />
                            </Col>
                          </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                          <Form.Group as={Row}>
                            <Form.Label column md="3">
                              Views
                            </Form.Label>
                            <Col md="9">
                              <Form.Control
                                autoComplete="off"
                                type="number"
                                value={this.state.Views}
                                id="Views"
                                name="Views"
                                onChange={this.function.handleChange}
                                isValid={this.state.Views !== ""}
                              />
                            </Col>
                          </Form.Group>
                        </Col>
                      </Form.Row>
                    </Form>
                    <hr className="footer-hr" />
                    <div className="panel-footer">
                      <div className="btn-group">
                        <span>
                          <Link
                            to="/app/jokes"
                            className=" btn btn-xs btn-secondary"
                          >
                            Back to List
                          </Link>
                        </span>
                      </div>
                      <div className="btn-group pull-right">
                        <span>
                          <Button
                            type="submit"
                            variant="success"
                            size="xs"
                            onClick={(e) =>
                              this.function.handleSubmit(
                                e,
                                requiredFields,
                                "joke"
                              )
                            }
                          >
                            {disable ? "Update" : "Save"}
                          </Button>
                        </span>
                        &nbsp;
                        <span>
                          <Button
                            type="submit"
                            variant="danger"
                            size="xs"
                            onClick={this.function.handleCancel}
                          >
                            Cancel
                          </Button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="flex-grow-1" />
          <Footer />
          {/* End Footer */}
        </div>
      </div>
    );
  }
}

export default AddJoke;
