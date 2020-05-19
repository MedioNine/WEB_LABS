import React, { Component } from "react";

const token = localStorage.getItem("Token");
let id = localStorage.getItem("id");
const url = "http://localhost:8000/media/images/";

export default class ImageChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      user: null,
      imgUrl: "",
    };
  }

  _handleSubmit(e) {
    let fd = new FormData();
    fd.append("user", this.state.user);
    fd.append("image", this.state.image);
    e.preventDefault();

    if (this.state.image)
      fetch("http://localhost:8000/media/upload/", {
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: fd,
      }).then((res) => {
        window.location.reload(false);
        localStorage.removeItem("User");

        return res.json();
      });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        user: id,
        imgUrl: reader.result,
      });
    };

    if (file) reader.readAsDataURL(file);
  }

  render() {
    return (
      <div id={this.props.urlProps}>
        {this.props.urlProps ? (
          <img
            className="photo rounded-circle img-responsive mt-2"
            src={
              this.state.imgUrl
                ? this.state.imgUrl
                : this.props.image
                ? url + this.props.image
                : ""
            }
            width="128"
            height="128"
          />
        ) : (
          ""
        )}
        <div className="previewComponent cA cAlabel">
          <form onSubmit={(e) => this._handleSubmit(e)}>
            <input
              type="file"
              accept="image/*"
              name="file"
              id="file"
              class="inputfile"
              onChange={(e) => this._handleImageChange(e)}
            />
            <label for="file">Choose a file</label>
          </form>
          <button
            className="submitButton"
            type="submit"
            onClick={(e) => this._handleSubmit(e)}
          >
            Upload Image
          </button>
        </div>
      </div>
    );
  }
}
