import React from "react";
import MaterialTable, { MTableToolbar } from "material-table";
import { Breadcrumb,  Button } from "react-bootstrap";
import Navigation from "../../components/Navigation/Navigation";
import Functions from "../../utils/Functions";
import Services from "../../utils/Services";
import Footer from "../../components/Common/Footer";
import { tableIcons, tableOptions } from "../../helpers/TableIcons";
import AlertDisplay from "../../components/Common/Alert";
import Loader from "../../components/Common/Loader";
import moment from "moment/moment";

class Jokes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: [],
      sideMenu: true,
      error: false,
      errorMessage: "",
      success: false,
      successMessage: "",
      alert: null,
      isLoading: false,
    };

    this.services = new Services(this);
    this.function = new Functions(this);
  }

  componentDidMount() {
    this.services.getJokes();
    if (sessionStorage.getItem('authToken') === undefined || sessionStorage.getItem('authToken') === null) {
      window.location.href = '/'
    }
  }

  render() {
    const columns = [
      {
        title: "Title",
        field: "Title",
        render: (rowData) => (
          <a href={`/app/edit-joke/${rowData.id}`}>
            {`${rowData.Title === undefined ? '': rowData.Title}`}
          </a>
        ),
      },
      {
        title: "Author",
        field: "Author",
        render: (rowData) => (
          rowData.Author !== undefined ?
          <div>{`${
            rowData.Author.replace(/ /g, "").includes("@")
              ? `${rowData.Author.replace(/ /g, "").slice(
                  0,
                  rowData.Author.lastIndexOf("@") + 1
                )}***.org`
              : `${rowData.Author}@***.org`
          }`}</div> : <div>{rowData.Author}</div>
        ),
      },
      {
        title: "Created Date",
        field: "CreatedAt",
        render: (rowData) => (
          <div>{moment(rowData.createdAt).format("DD MMM YYYY")}</div>
        ),
      },
      {
        title: "Views",
        field: "Views",
        type: "numeric",
        render: (rowData) =>
          parseInt(rowData.Views, 10) <= 25 ? (
            <span style={{ color: "tomato" }}>tomato</span>
          ) : parseInt(rowData.Views, 10) > 25 &&
            parseInt(rowData.Views, 10) <= 50 ? (
            <span style={{ color: "orange" }}>orange</span>
          ) : parseInt(rowData.Views, 10) > 50 &&
            parseInt(rowData.Views, 10) <= 75 ? (
            <span style={{ color: "yellow" }}>yellow</span>
          ) : parseInt(rowData.Views, 10) > 75 &&
            parseInt(rowData.Views, 10) <= 100 ? (
            <span style={{ color: "green" }}>green</span>
          ) : (
            <span style={{ color: "green" }}>{rowData.Views}</span>
          ),
      },
    ];

    let loader = null;
    if (this.state.isLoading) {
      loader = <Loader message="Sending..." />;
    }

    return (
      <div className="page-wrapper">
        {/* Navigation */}
        <Navigation onClick={this.function._onSideMenu} />
        {/* End Navigation */}

        <div
          className={`main-content d-flex flex-column ${
            this.state.sideMenu ? "" : "hide-sidemenu"
          }`}
        >
          {/* Breadcrumb */}
          <div className="main-content-header">
            <Breadcrumb>
              <Breadcrumb.Item to="/app/jokes">Jokes</Breadcrumb.Item>
              <Breadcrumb.Item active>Jokes Summary</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          {/* End Breadcrumb */}
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
          {loader}
          <div className="card mb-4">
            <div className="card-body">
              <MaterialTable
                columns={columns}
                data={this.state.jokes}
                icons={tableIcons}
                title=""
                options={tableOptions}
                components={{
                  Toolbar: (props) => (
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="text-left">
                          <div className="form-group">
                            <Button
                              type="submit"
                              variant="success"
                              size="xs"
                              onClick={(e) =>
                                this.props.history.push('/app/create-joke')
                              }
                            >
                              <i className="fa fa-plus-circle" /> New Joke
                            </Button>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4" />
                      <div className="col-lg-4">
                        <MTableToolbar {...props} />
                      </div>
                    </div>
                  ),
                }}
                isLoading={this.state.isLoading}
              />
            </div>
          </div>
          {this.state.alert}
          {/* Footer */}
          <div className="flex-grow-1" />
          <Footer />
          {/* End Footer */}
        </div>
      </div>
    );
  }
}

export default Jokes;
