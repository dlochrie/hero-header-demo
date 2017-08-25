import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem } from 'reactstrap';
import { NavLink } from 'react-router-dom';

import { routes } from '../common/constants';

class Navigation extends Component {
  constructor(props) {
    super(props);

    // Bind class methods here to avoid linting errors and duplicate bindings.
    // See: https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-bind.md.
    this.closeMenu = this.closeMenu.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      collapsed: true,
    };
  }

  /**
   * Explicity closes menu (smaller screens only).
   */
  closeMenu() {
    if (!this.state.collapsed) {
      this.setState({
        collapsed: true,
      });
    }
  }

  toggleMenu() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return (
      <Navbar full fixed="top" toggleable className="bg-dark navbar-dark navbar-expand-md">
        <NavbarBrand href="/">Hero Header Demo</NavbarBrand>
        <NavbarToggler right onClick={this.toggleMenu} />
        <Collapse isOpen={!this.state.collapsed} navbar>
          <Nav className="ml-auto" navbar>
            {routes.map(route => (
              <NavItem key={route.path}>
                <NavLink
                  exact
                  to={route.path}
                  key={route.title}
                  className="nav-link"
                  activeClassName="active"
                  onClick={this.closeMenu}
                >{route.title}</NavLink>
              </NavItem>
              ))}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
