import React from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import * as Icon from 'react-feather';
import './SideMenu.css';
import Services from '../../../utils/Services';
import Functions from '../../../utils/Functions';

class SideMenuLight extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };

    this.services = new Services(this);
    this.function = new Functions(this);
  }

  render() {
    return (
      <div
        className={`sidemenu-area sidemenu-light ${
          this.props.sideMenu ? 'sidemenu-toggle' : ''
        }`}
      >
        <Navbar
          className={`sidemenu ${this.props.sideMenu ? 'hide-nav-title' : ''}`}
        >
            <Navbar.Collapse>
            <Nav>
                <Nav.Link>
                  <div className="dropdown-title">
                    <Icon.List className="icon" />
                    <span className="title">
                      Jokes
                    </span>
                  </div>
                </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(SideMenuLight);
