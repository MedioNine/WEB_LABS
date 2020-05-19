import { Container, Col } from "reactstrap";
import React, { Component } from "react";
import "./createservice.css";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import { Link } from "react-router-dom";
class CreateProduct extends Component {
  constructor(props) {
    super(props);

    this.handleService = this.handleService.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      title: "",
      description: "",
      category: "Business",
      price: "",
    };
  }

  handleChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  handleService(event) {
    event.preventDefault();
    fetch("http://localhost:8000/services/", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("Token")}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(this.state),
    }).then((res) => {
      this.props.history.push("/myProducts");
      return res.json();
    });
  }

  render() {
    return (
      <React.Fragment>
        <Container
          className="mb-5 mt-5 pt-5 pb-5 border rounded-lg shadow-lg p-3"
          style={{ backgroundColor: "whitesmoke" }}
        >
          <Col xl={{ size: 10, offset: 1 }}>
            <h1>Create Product Form</h1>
            <Form onSubmit={this.handleService}>
              <FormGroup>
                <Label htmlFor="title">Service title</Label>
                <Input
                  type="text"
                  id="title"
                  name="title"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label htmlFor="description">
                  Tell something about your service
                </Label>
                <Input
                  type="textarea"
                  id="description"
                  name="description"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for="category">Select category</Label>
                <Input
                  type="select"
                  name="category"
                  id="category"
                  onChange={this.handleChange}
                >
                  <option>Business</option>
                  <option>Digital marketing</option>
                  <option>Graphics and design</option>
                  <option>Music and audio</option>
                  <option>Programming and tech</option>
                  <option>Video and animation</option>
                  <option>Writing and translation</option>
                  <option>Others</option>
                </Input>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button outline onClick={this.toggleReg} className='btn-sm'>
                <span className="fa fa-sign-up fa-lg"></span> POST YOUR SERVICE
              </Button>
              <Link to="/myproducts/">
                <Button type="submit" value="submit" className="float-right btn-sm">
                  BACK
                </Button>
              </Link>
            </Form>
          </Col>
        </Container>
      </React.Fragment>
    );
  }
}

export default CreateProduct;
