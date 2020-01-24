import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
// import CKEditors from "react-ckeditor-component";
import one from "../../../assets/images/pro3/1.jpg";
import user from "../../../assets/images/user.png";
import { connect } from "react-redux";
import PropTypes from "prop-types";

export class Add_product extends Component {
  constructor(props) {
    console.log("props in Add_product Component:", props);
    super(props);
    this.state = {
      image: "",
      name: "",
      model: "",
      price: "",
      manufacturer: "",
      description: "",
      sku: this.randomSkuGenerator(),
      upc: this.randomUpcGenerator()
    };
  }

  // method to randomly generate sku number
  randomSkuGenerator = () => {
    const randomSku = Math.floor(1000000 + Math.random() * 900000);
    return randomSku;
  };

  // method to randomly generate upc number
  randomUpcGenerator = () => {
    const randomUpc = parseInt(Math.random() * 1000000000, 10);
    return randomUpc;
  };

  handleChange = e => {
    this.setState({ [e.currentTarget.name]: e.currentTarget.value });
  };

  // method to clear all fields
  discardFields = () => {
    this.setState({
      image: "",
      name: "",
      model: "",
      price: "",
      manufacturer: "",
      description: ""
    });
  };

  // method to create a product
  addProduct = async (e, productFromForm) => {
    //prevents the browser from reloading when an event is called...
    e.preventDefault();
    console.log("productFromForm:", productFromForm);
    try {
      //Call the array of all of the courses in the DB.
      const createdProductResponse = await fetch(
        "http://localhost:8000/api/v1/products/",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(productFromForm),
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      const parsedResponse = await createdProductResponse.json();
      console.log("parsedResponse:", parsedResponse);
      console.log("this.props:", this.props);
    } catch (err) {
      console.log("err:", err);
    }
  };

  render() {
    return (
      <Fragment>
        <Breadcrumb title="Add Product" parent="Physical" />
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="card">
                <div className="card-header">
                  <h5>Add Product</h5>
                </div>
                <form
                  className="needs-validation add-product-form"
                  onSubmit={e => this.addProduct(e, this.state)}
                >
                  <div className="card-body">
                    <div className="row product-adding">
                      <div className="col-xl-5">
                        <div className="add-product">
                          <div className="row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Select Photo:{" "}
                              <input
                                type="file"
                                name="image"
                                value={this.state.image}
                                onChange={this.handleChange}
                              ></input>
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-xl-7">
                        <div className="form form-label-center">
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Product Name :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                value={this.state.name}
                                onChange={this.handleChange}
                                name="name"
                                className="form-control"
                                id="validationCustom01"
                                type="text"
                                required
                              ></input>
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Model :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                value={this.state.model}
                                onChange={this.handleChange}
                                name="model"
                                className="form-control mb-0"
                                id="validationCustom02"
                                type="text"
                                required
                              ></input>
                            </div>
                          </div>
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Price :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                value={this.state.price}
                                onChange={this.handleChange}
                                name="price"
                                className="form-control mb-0"
                                name="price"
                                id="validationCustom03"
                                type="number"
                                required
                              ></input>
                            </div>
                          </div>
                        </div>
                        <div className="form">
                          <div className="form-group mb-3 row">
                            <label className="col-xl-3 col-sm-4 mb-0">
                              Manufacturer :
                            </label>
                            <div className="col-xl-8 col-sm-7">
                              <input
                                value={this.state.manufacturer}
                                onChange={this.handleChange}
                                name="manufacturer"
                                className="form-control"
                                id="validationCustom04"
                                type="text"
                                required
                              ></input>
                            </div>
                          </div>
                          <div className="form-group row">
                            <label className="col-xl-3 col-sm-4">
                              Add Description :
                            </label>
                            <div className="col-xl-8 col-sm-7 description-sm">
                              <textarea
                                value={this.state.description}
                                onChange={this.handleChange}
                                name="description"
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <div className="offset-xl-3 offset-sm-4">
                          <button type="submit" className="btn btn-primary">
                            Add
                          </button>
                          <button
                            type="button"
                            className="btn btn-light"
                            onClick={this.discardFields}
                          >
                            Discard
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

Add_product.propTypes = {
  addProduct: PropTypes.func
};

const mapStateToProps = state => ({
  products: state.products
});

export default connect(mapStateToProps)(Add_product);
