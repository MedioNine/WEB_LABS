import React, { Component } from "react";

import { Container, Row, Col, Button } from "reactstrap";
import "./card.css";
import koks from "../cat.jpg";
import { Link } from "react-router-dom";

const url = "http://localhost:8000/media";

let orders;

class MyProducts extends Component {
  constructor(props) {
    super(props);

    this.renderservices = this.renderservices.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleImageDelete = this.handleImageDelete.bind(this);
    this.state = {
      services: false,
      image: null,
    };
  }

  componentDidUpdate() {
    if (this.state.services === false)
      fetch("http://localhost:8000/services/my/", {
        method: "GET",
        headers: {
          Authorization: `Token ${localStorage.getItem("Token")}`,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          orders = data;

          if (orders.length > 0)
            this.setState({
              services: true,
            });
        });
  }
  componentDidMount() {
    fetch("http://localhost:8000/services/my/", {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem("Token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        orders = data;

        if (orders.length > 0)
          this.setState({
            services: true,
          });
      });
  }

  handleImageChange(e, id) {
    if (e.target.files && e.target.files[0]) {
      e.preventDefault();
      let file = e.target.files[0];

      if (file) {
        let fd = new FormData();
        fd.append("service", id);
        fd.append("image", file);

        fetch("http://localhost:8000/media/upload/", {
          method: "POST",
          headers: {
            Authorization: `Token ${localStorage.getItem("Token")}`,
          },
          body: fd,
        }).then((res) =>
          this.setState({
            services: false,
          })
        );
      }
    }
  }

  handleImageDelete(e, id) {
    e.preventDefault();

    fetch(`http://localhost:8000/services/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("Token")}`,
      },
    }).then((res) => {
      if (res.ok)
        this.setState({
          services: false,
        });
    });
  }

  renderservices() {
    if (this.state.services) {
      const map = orders.map((service) => (
        <Col xl="4" lg="6" md="6" sm={{ size: 12, offset: 0 }} xs="12">
          <div className="card booking-card mt-3 mb-3 d-flex align-items-stretch">
            <div className="view overlay">
              <img
                className="card-img-top"
                src={
                  service.image[0]
                    ? url + service.image[service.image.length - 1].image
                    : koks
                }
                className=" img-trouble"
                width="100%"
                alt="Card"
              />
              <a href="#!">
                <div className="mask flex-center rgba-white-slight">
                  <div className="upload-btn-wrapper">
                    <Button className="btn-1 " color="secondary">
                      Change photo
                    </Button>
                    <input
                      type="file"
                      accept="image/*"
                      name="file"
                      id="file"
                      className="inputfile"
                      onChange={(e) => this.handleImageChange(e, service.id)}
                    />
                  </div>
                  <div>
                    <Button
                      color="danger"
                      onClick={(e) => this.handleImageDelete(e, service.id)}
                    >
                      Delete service
                    </Button>
                  </div>
                </div>
              </a>
            </div>

            <div className="card-body">
              <h4 className="card-title font-weight-bold">
                <a>{service.title}</a>
              </h4>

              <ul className="list-unstyled list-inline rating mb-0">
                <li className="list-inline-item mr-0">
                  <i className="fa fa-star amber-text"> </i>
                </li>
                <li className="list-inline-item mr-0">
                  <i className="fa fa-star amber-text"></i>
                </li>
                <li className="list-inline-item mr-0">
                  <i className="fa fa-star amber-text"></i>
                </li>
                <li className="list-inline-item mr-0">
                  <i className="fa fa-star amber-text"></i>
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-star-half-alt amber-text"></i>
                </li>
                <li className="list-inline-item">
                  <p className="text-muted">4.5 (413)</p>
                </li>
              </ul>
              <p className="mb-2">
                • {service.owner.username},{service.owner.first_name}{" "}
                {service.owner.last_name}
              </p>
              <p className="mb-2">Posted: {service.date}</p>
              <p className="card-text overflow-auto" style={{ height: "70px" }}>
                {service.description}
              </p>
              <hr className="my-4" />
              <p className="lead price text-success">
                <strong>${service.price}</strong>
              </p>

              <a href="#" className="btn btn-primary  mt-3 float-right">
                <i className="fa fa-info"></i> Watch Details
              </a>
            </div>
          </div>{" "}
        </Col>
      ));
      return map;
    } else return <div></div>;
  }

  render() {
    return (
      <React.Fragment>
        {this.state.services ? (
          <div className="text-center justify-content-center">
            <p className="text-monospace text-center h1">YOUR PRODUCTS</p>
            <Link to="/myproducts/create">
              <Button color="primary" size="lg">
                Create New
              </Button>
            </Link>
          </div>
        ) : (
          <div
            className="text-center  d-flex justify-content-center flex-column"
            style={{ height: "300px" }}
          >
            <p className="text-monospace text-center h1 align-self-center">
              YOU HAVE NO PRODUCTS
            </p>
            <Link to="/myproducts/create">
              {" "}
              <Button color="primary" size="lg">
                Create New
              </Button>
            </Link>
          </div>
        )}

        <Container>
          <Row>
            <this.renderservices></this.renderservices>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default MyProducts;
