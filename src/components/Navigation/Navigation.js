import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import * as Icon from 'react-feather';
import './Navigation.css';
import {
  Navbar,
  Nav,
  NavDropdown,
  Image,
} from 'react-bootstrap';
import SideMenuLight from './SideMenu/SideMenuLight';
import Logo from '../../assets/img/jokes.png';
import profile from '../../assets/img/empty_profile.jpg';
import Services from '../../utils/Services';
import Functions from '../../utils/Functions';

class Navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sideMenu: false,
      menuColor: true,
    };
    this.services = new Services(this);
    this.function = new Functions(this);
  }


  _toggleClass = () => {
    const currentSideMenu = this.state.sideMenu;
    this.setState({ sideMenu: !currentSideMenu });
    this.props.onClick(this.state.sideMenu);
  };


  render() {
    return (
      <div className="page-wrapper">
        <Navbar fixed="top" className="top-menu">
          <Link
            to="#"
            className={`navbar-brand ${
              this.state.sideMenu ? 'navbar-logo' : ''
            }`}
          >
            {/* Large logo */}
            <Image
              src={Logo}
              alt="Logo"
              className="large-logo mw-170"
              style={{ height: '20px' }}
            />
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Burger menu */}
          <div
            className={`burger-menu ${
              this.state.sideMenu ? 'toggle-menu' : ''
            }`}
            onClick={this._toggleClass}
          >
            <span className="top-bar" />
            <span className="middle-bar" />
            <span className="bottom-bar" />
          </div>
          {/* End Burger menu */}

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto right-nav">
              <NavDropdown
                title={(
                  <div className="menu-profile">
                    <span className="name">
                      Username
                    </span>
                    <Image src={profile} alt="Profile Image" roundedCircle />
                  </div>
                )}
                id="basic-nav-dropdown"
                className="profile-nav-item"
              >
                <NavLink
                  to="#"
                  className="dropdown-item"
                  onClick={() => this.services.signOut()}
                >
                  <Icon.LogOut className="icon" />
                  Logout
                </NavLink>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <SideMenuLight
          sideMenu={this.state.sideMenu}
          values={this.state}
        />
      </div>
    );
  }
}

export default withRouter(Navigation);
