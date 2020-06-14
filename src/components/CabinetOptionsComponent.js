import React, { Component } from "react";
import {
  Nav,
  UncontrolledButtonDropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";
import { Link } from "react-router-dom";
const url = "http://localhost:8000/media";

class CabinetOptions extends Component {
  constructor(props) {
    super(props);

    this.toggleSet = this.toggleSet.bind(this);
    this.toggleNameChange = this.toggleNameChange.bind(this);
    this.togglePasswordChange = this.togglePasswordChange.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSet = this.handleSet.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUploadPhoto = this.handleUploadPhoto.bind(this);
    this.state = {
      id: "",
      user: "",
      image: null,
      imagenew: null,
      fetched: false,
      isSetOpen: false,
      isNameOpen: false,
      isPasOpen: false,
      isDelOpen: false,
      imgUrl: "",
      upd_first_name: "",
      upd_last_name: "",
      errPas: "",
      Token: localStorage.getItem("Token"),
    };
  }

  handleUploadPhoto(e) {
    if (this.state.imagenew) {
      let fd = new FormData();
      fd.append("user", this.state.id);
      fd.append("image", this.state.imagenew);
      e.preventDefault();

      fetch("http://localhost:8000/media/upload/", {
        method: "POST",
        headers: {
          Authorization: `Token ${localStorage.getItem("Token")}`,
        },
        body: fd,
      });
    }
  }

  handleDelete = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/users/me/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/opaque",
        Authorization: `Token ${localStorage.getItem("Token")}`,
      },
    })
      .then((res) => res.text())
      .then((data) => {
        localStorage.removeItem("Token");
        this.setState({
          Token: "",
        });
        this.toggleDelete();
        window.location.href = "http://localhost:3000/";
        window.location.replace("http://localhost:3000/");
      });
  };

  handlePasswordChange = (event) => {
    event.preventDefault();

    let fd = new FormData();
    fd.append("old_password", this.state.old_password);
    fd.append("new_password1", this.state.new_password1);
    fd.append("new_password2", this.state.new_password2);

    fetch("http://localhost:8000/auth/change_password/", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("Token")}`,
      },
      body: fd,
    })
      .then((response) => {
        if (!response.ok) {
          this.setState({
            errPas: "You put something wrong",
          });

          throw response;
        }
        return response.json();
      })
      .then((data) => {
        localStorage.removeItem("Token", data.Token);
        localStorage.setItem("Token", data.Token);
        this.setState({
          errPas: "",
        });
        this.togglePasswordChange();
      })
      .catch((err) => {
        err.text();
      });
  };

  handleNameChange = (event) => {
    event.preventDefault();

    let fd = new FormData();
    fd.append("first_name", this.state.upd_first_name);
    fd.append("last_name", this.state.upd_last_name);

    fetch("http://localhost:8000/users/edit/", {
      method: "PATCH",
      headers: {
        Authorization: `Token ${localStorage.getItem("Token")}`,
      },
      body: fd,
    }).then((res) => {
      this.toggleNameChange();
      this.setState({
        first_name: this.state.upd_first_name,
        last_name: this.state.upd_last_name,
      });
      return res.json();
    });
  };

  toggleNameChange() {
    this.setState({
      isNameOpen: !this.state.isNameOpen,
    });
  }

  togglePasswordChange() {
    this.setState({
      isPasOpen: !this.state.isPasOpen,
    });
  }

  toggleDelete() {
    this.setState({
      isDelOpen: !this.state.isDelOpen,
    });
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  toggleSet() {
    this.setState({
      isSetOpen: !this.state.isSetOpen,
    });
  }

  handleSet(event) {
    if (this.state.fetched === false || localStorage.getItem("Token")) {
      event.preventDefault();
      fetch("http://localhost:8000/users/me/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${localStorage.getItem("Token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          this.setState(data);

          this.setState({ image: data.image[0].image });

          this.setState({ fetched: true });
        });
    } else {
    }
    this.toggleSet();
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        imagenew: file,
        imgUrl: reader.result,
      });
    };

    if (file) reader.readAsDataURL(file);
  }

  render() {
    const Token = this.props.Token;
    if (Token) {
      return (
        <React.Fragment>
          <Nav className=" ml-auto" navbar>
            <UncontrolledButtonDropdown>
              <DropdownToggle caret className="color-black">
                My cabinet
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem header>Options</DropdownItem>
                <Link to="/myproducts">
                  {" "}
                  <DropdownItem>My products</DropdownItem>
                </Link>
                <DropdownItem>My orders</DropdownItem>
                <DropdownItem divider />
                <DropdownItem onClick={this.handleSet}>Settings</DropdownItem>
              </DropdownMenu>
            </UncontrolledButtonDropdown>
          </Nav>

          <Modal id='Sett' isOpen={this.state.isSetOpen} toggle={this.toggleSet}>
            <ModalHeader toggle={this.toggleSet}>Settings</ModalHeader>
            <ModalBody>
              <div className="text-center clearfix">
                <div className="upload-btn-wrapper">
                  <Button className="btn-1" color="secondary">
                    Choose a photo
                  </Button>
                  <input
                    type="file"
                    accept="image/*"
                    name="file"
                    id="file"
                    className="inputfile"
                    onChange={(e) => this.handleImageChange(e)}
                  />
                </div>
                <div>
                  <img
                    className="photo rounded-circle img-responsive mt-2"
                    alt="ProfileImage"
                    src={
                      this.state.imgUrl
                        ? this.state.imgUrl
                        : this.state.image
                        ? url + this.state.image
                        : ""
                    }
                    width="128"
                    height="128"
                  />
                </div>
              </div>
              <div className="text-center">
                <Button color="secondary" onClick={this.handleUploadPhoto}>
                  Upload Photo
                </Button>{" "}
              </div>
              <p>
                Username: <kbd>{this.state.username}</kbd>
              </p>
              <p>
                First name:{" "}
                <kbd>
                  {this.state.first_name
                    ? this.state.first_name
                    : "please set first name"}
                </kbd>
              </p>
              <p>
                Last name:{" "}
                <kbd>
                  {this.state.last_name
                    ? this.state.last_name
                    : "please set last name"}
                </kbd>
              </p>
              <p>
                Date joined:{" "}
                <kbd>
                  {this.state.date_joined
                    ? this.state.date_joined.slice(0, 10)
                    : ""}
                </kbd>
              </p>
              <Button
                color="secondary"
                block
                onClick={this.toggleNameChange}
                className="mb-3"
              >
                Change First/Last name
              </Button>{" "}
              <Button
                color="warning"
                block
                onClick={this.togglePasswordChange}
                className="mb-3"
              >
                Change Password
              </Button>{" "}
              <Button color="danger" block onClick={this.toggleDelete}>
                Delete Account
              </Button>{" "}
            </ModalBody>
          </Modal>

          <Modal id='NameM' isOpen={this.state.isNameOpen} toggle={this.toggleNameChange}>
            <ModalHeader toggle={this.toggleNameChange}>
              Change first/last name
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleNameChange}>
                <FormGroup>
                  <Label htmlFor="username">First name</Label>
                  <Input
                    type="text"
                    id="upd_first_name"
                    name="upd_first_name"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="username">Last Name</Label>
                  <Input
                    type="text"
                    id="upd_last_name"
                    name="upd_last_name"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <Button type="submit" value="submit" className="float-left">
                  Change
                </Button>
                <Button
                  outline
                  onClick={this.toggleNameChange}
                  className="float-right"
                >
                  Cancel
                </Button>
              </Form>
            </ModalBody>
          </Modal>

          <Modal id='DelM' isOpen={this.state.isDelOpen} toggle={this.toggleDelete}>
            <ModalHeader toggle={this.toggleDelete}>
              Are You sure about this?
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handleDelete}>
                <Button type="submit" value="submit" className="float-left">
                  Delete
                </Button>
                <Button
                  outline
                  onClick={this.toggleDelete}
                  className="float-right"
                >
                  Cancel
                </Button>
              </Form>
            </ModalBody>
          </Modal>

          <Modal
             id='PasM'
            isOpen={this.state.isPasOpen}
            toggle={this.togglePasswordChange}
          >
            <ModalHeader toggle={this.togglePasswordChange}>
              Change Password
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={this.handlePasswordChange}>
                <FormGroup>
                  <Label htmlFor="old_password">Old Password</Label>
                  <Input
                    type="password"
                    id="old_password"
                    name="old_password"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="new_password1">New Password</Label>
                  <Input
                    type="password"
                    id="new_password1"
                    name="new_password1"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label htmlFor="new_password1">Repeat Password</Label>
                  <Input
                    type="password"
                    id="new_password2"
                    name="new_password2"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                {this.state.errPas ? (
                  <div style={{ color: "red" }}>{this.state.errPas}</div>
                ) : (
                  <span></span>
                )}
                <Button type="submit" value="submit" className="float-left">
                  Change
                </Button>
                <Button
                  outline
                  onClick={this.togglePasswordChange}
                  className="float-right"
                >
                  Cancel
                </Button>
              </Form>
            </ModalBody>
          </Modal>
        </React.Fragment>
      );
    } else {
      return <div></div>;
    }
  }
}

export default CabinetOptions;
