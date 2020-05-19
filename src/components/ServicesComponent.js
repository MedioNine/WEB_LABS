import React, { Component } from "react";

import { Container, Row, Col } from "reactstrap";
import "./card.css";
import koks from "../cat.jpg";
const url = "http://localhost:8000/media";

const token = localStorage.getItem("Token");
let isLogined = token ? true : false;

let orders;

class Services extends Component {
  constructor(props) {
    super(props);

    this.renderservices = this.renderservices.bind(this);

    this.state = {
      services: false,
    };
  }

  componentDidMount(props) {
    if (!isLogined) {
      this.props.history.push("/");
    } else {
      let stat;
      fetch(`http://localhost:8000/services/user/${this.props.id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          stat = res.status;
          if (res.ok) return res.json();
        })
        .then((data) => {
          if (stat <= 400) {
          
            orders = data;
          console.log(orders)
            this.setState({
              services: true,
            });
          }
        });
    }
  }

  renderservices() {
    if (this.state.services) {
      const map = orders.map((service) => (
        <Col xl="4" lg="6" md="6" sm={{ size: 12, offset: 0 }} xs="12">
          <div className="card booking-card mt-3 mb-3" key={service.id}>
            <div className="view overlay">
              <img
                className="card-img-top img-trouble"
                src={service.image.length>0? url+service.image[service.image.length - 1].image : koks}
                
                width="100%"
                alt="Card"
              />
              <a href="#!">
                <div className="mask rgba-white-slight"> </div>
              </a>
            </div>

            <div className="card-body">
              <h4 className="card-title font-weight-bold">
                <a >{service.title}</a>
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
              <p className="card-text" style={{ height: "50px" }}>
                {service.description}
              </p>
              <hr className="my-4" />
              <p className="lead price text-success">
                <strong>${service.price}</strong>
              </p>

              <a href="#" className="btn btn-danger mt-3">
                <i className="fa fa-shopping-cart"></i> Add
              </a>
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
      <Container>
        <Row>
          <this.renderservices></this.renderservices>
        </Row>
      </Container>
    );
  }
}

export default Services;
