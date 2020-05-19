import React, { Component } from "react";
import koks from "../cat.jpg";

class CardService extends Component {
  render() {
    return (
      <div className="card booking-card mt-3 mb-3">
        <div className="view overlay">
          <img className="card-img-top" src={koks} alt="Card" />
          <a href="#!">
            <div className="mask rgba-white-slight"> </div>
          </a>
        </div>

        <div className="card-body">
          <h4 className="card-title font-weight-bold">Something</h4>

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
          <p className="mb-2">• Yurii,Hirnyk Designer</p>
          <p className="mb-2">Posted: 2020-05-21</p>
          <p className="card-text" style={{ height: "50px" }}>
            Design everything you need!
          </p>
          <hr className="my-4" />
          <p className="lead price text-success">
            <strong>$10</strong>
          </p>

          <a href="#" className="btn btn-danger mt-3">
            <i className="fa fa-shopping-cart"></i> Add
          </a>
          <a href="#" className="btn btn-primary  mt-3 float-right">
            <i className="fa fa-info"></i> Watch Details
          </a>
        </div>
      </div>
    );
  }
}

export default CardService;
