import React, { Component } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { NavLink } from "react-router-dom";
import CabinetOptions from "./CabinetOptionsComponent";
import koks from "../icon.png";

class Header extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.toggleLogin = this.toggleLogin.bind(this);
    this.handleReg = this.handleReg.bind(this);
    this.toggleReg = this.toggleReg.bind(this);
    this.toggleNav = this.toggleNav.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeReg = this.handleChangeReg.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.state = {
      isNavOpen: false,
      isLoginOpen: false,
      isRegOpen: false,
      errLog: "",
      errReg: "",
      username: "",
      password: "",
      Token: localStorage.getItem("Token"),
      reg: {
        username: "",
        password: "",
        password2: "",
        email: "",
      },
    };
  }

  handleBlur = (field) => (evt) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true },
    });
  };

  handleReg(event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8000/auth/register/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.reg),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.email) {
          this.setState({
            errReg: data.email,
          });
        } else if (data.non_field_errors) {
          this.setState({
            errReg: data.non_field_errors,
          });
        } else if (data.username) {
          this.setState({
            errReg: data.username,
          });
        } else if (data.detail) {
          this.setState({
            errReg: data.detail,
          });
        }
      });
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleChangeReg = (event) => {
    const { reg } = { ...this.state };
    const currentState = reg;
    const { name, value } = event.target;
    currentState[name] = value;
    this.setState({ reg: currentState });
  };

  handleLogout(event) {
    event.preventDefault();
    fetch("http://localhost:8000/auth/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${this.state.Token}`,
      },
    }).then((res) => {
      this.setState({
        Token: "",
        errLog: "",
      });
      localStorage.removeItem("Token");
      window.location.href = "http://localhost:3000/";
      window.location.replace("http://localhost:3000/");
    });
  }

  handleLogin(event) {
    event.preventDefault();
    fetch("http://127.0.0.1:8000/auth/login/", {
      method: "POST",
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.detail) {
          this.setState({
            errLog: data.detail,
          });
        } else {
          this.setState({
            Token: data.Token,
          });
          localStorage.setItem("Token", data.Token);
          this.toggleLogin();
        }
      });
  }
  toggleReg() {
    this.setState({
      isRegOpen: !this.state.isRegOpen,
    });
  }
  toggleLogin() {
    this.setState({
      isLoginOpen: !this.state.isLoginOpen,
    });
  }

  toggleNav() {
    this.setState({
      isNavOpen: !this.state.isNavOpen,
    });
  }

  render() {
    return (
      <React.Fragment>
        <Navbar dark expand="md">
          <div className="container">
            <NavbarToggler onClick={this.toggleNav} />
            <NavbarBrand className="mr-auto" href="/">
              <img src={koks} height="41" width="41" alt="WanderLanceLogo" />
            </NavbarBrand>
            <Collapse isOpen={this.state.isNavOpen} navbar>
              <Nav navbar>
                <NavItem>
                  <NavLink className="nav-link" to="/home">
                    <span className="fa fa-home fa-lg"></span> Home
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/aboutus">
                    <span className="fa fa-info fa-lg"></span> About Us
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink className="nav-link" to="/contactus">
                    <span className="fa fa-address-card fa-lg"></span> Contact
                    Us
                  </NavLink>
                </NavItem>
              </Nav>
              <CabinetOptions Token={this.state.Token} />
              <Nav className={this.state.isNavOpen ? "mt-2" : "ml-2"} navbar>
                {this.state.Token ? (
                  <NavItem>
                    <Button
                      outline
                      block
                      onClick={this.handleLogout}
                      style={{ color: "white" }}
                    >
                      <span className="fa fa-logout fa-lg"></span> Logout
                    </Button>
                  </NavItem>
                ) : (
                  <NavItem>
                    <Button   outline onClick={this.toggleLogin}>
                      <span className="fa fa-sign-in fa-lg"></span> Login
                    </Button>
                  </NavItem>
                )}
              </Nav>
            </Collapse>
          </div>
        </Navbar>
        <Jumbotron>
          <div className="container">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1>WanderLance</h1>
                <p>Make your life better right now!</p>
              </div>
            </div>
          </div>
        </Jumbotron>

        <Modal isOpen={this.state.isLoginOpen} toggle={this.toggleLogin}>
          <ModalHeader toggle={this.toggleLogin}>Login</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleLogin}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="checkbox" name="remember" />
                  Remember me
                </Label>
              </FormGroup>
              {this.state.errLog ? (
                <div style={{ color: "red" }}>{this.state.errLog}</div>
              ) : (
                <span></span>
              )}
              <Button outline onClick={this.toggleReg}>
                <span className="fa fa-sign-up fa-lg"></span> Sign up!
              </Button>
              <Button  type="submit" value="submit" className="float-right">
                Login
              </Button>
            </Form>
          </ModalBody>
        </Modal>

        <Modal isOpen={this.state.isRegOpen} toggle={this.toggleReg}>
          <ModalHeader toggle={this.toggleReg}>Registration</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleReg}>
              <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  onChange={this.handleChangeReg}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  onChange={this.handleChangeReg}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  onChange={this.handleChangeReg}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="repeatpassword">Repeat password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password2"
                  onChange={this.handleChangeReg}
                />
              </FormGroup>
              {this.state.errReg ? (
                <div style={{ color: "red" }}>{this.state.errReg}</div>
              ) : (
                <span></span>
              )}
              <Button type="submit" value="submit">
                Register Me
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

export default Header;
