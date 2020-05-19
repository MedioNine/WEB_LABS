import React, { Component } from "react";

import { Card, CardBody, Container, Row, Col } from "reactstrap";
import Services from "./ServicesComponent";
import koks from "../cat.jpg";

const token = localStorage.getItem("Token");
let isLogined = token ? true : false;
const url = "http://localhost:8000/media";

export default class Userprofile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: null,
      username: "",
      first_name: "",
      last_name: "",
      last_login: null,
      date_joined: null,
      fetched: false,
      image: null,
      user: null,
    };
  }

  componentDidMount() {
    if (!isLogined) {
        window.location.href = "http://localhost:3000/";
          window.location.replace("http://localhost:3000/");
    } else {
      const { id } = this.props.match.params;

      localStorage.setItem("id", id);
      let stat;
      fetch(`http://localhost:8000/users/${id}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
        .then((res) => {
          stat = res.status;
          if (res.ok) return res.json()
          
        })
        .then((data) => {
          if (stat <= 400) {
            this.setState(data);
            this.setState({ fetched: true });
            this.setState({ image: data.image[0].image });
          } else      {
            window.location.href = "http://localhost:3000/";
        window.location.replace("http://localhost:3000/");
        };
        });
    }
  }

  render() {
    return (
      <React.Fragment>
        <Container className="border mt-5 mb-2 rounded shadow-lg p-3 mb-5 bg-white">
          <Row className="align-items-center">
            <Col xl="4" lg="4" md="4" sm="12" xs="12" className="text-center">
              <img
                className="photo rounded-circle img-responsive mt-2"
                alt="ProfileImage"
                src={this.state.image ? url + this.state.image : koks}
                width="360"
                height="360"
              />
            </Col>
            <Col
              xl={{ size: 6, offset: 2 }}
              lg={{ size: 6, offset: 2 }}
              md={{ size: 6, offset: 2 }}
              sm={{ size: 12, offset: 0 }}
              xs="12"
            >
              <h2 className="text-primary font-weight-bold ">
                {this.state.username}
              </h2>
              <p className="text-primary font-weight-bold">
                First Name:{" "}
                <span className="text-default text-monospace">
                  {this.state.first_name}
                </span>
              </p>
              <p className="text-primary font-weight-bold">
                Last Name:{" "}
                <span className="text-default text-monospace">
                  {this.state.last_name}
                </span>
              </p>
              <p className="text-primary font-weight-bold">
                WanderLancer from :
                <span className="text-default text-monospace">
                  {this.state.date_joined?this.state.date_joined.slice(0, 10):''}
                </span>{" "}
              </p>
            </Col>
          </Row>
        </Container>
        <Card style={{ width: "100%" }}>
          <CardBody>
            <div className="text-center mb-3 text-info font-weight-bold h3">USER SERVICES</div>
          </CardBody>
        </Card>
        <Services id={this.props.match.params.id} />
      </React.Fragment>
    );
  }
}
