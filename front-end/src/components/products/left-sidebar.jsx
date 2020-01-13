import React, { Component } from "react";
import { Helmet } from "react-helmet";
import "../common/index.scss";
import { connect } from "react-redux";

// import custom Components
import Service from "./common/service";
import Breadcrumb from "../boilerplates/breadcrumb";
import DetailsWithPrice from "./common/product/details-price";
import DetailsTopTabs from "./common/details-top-tabs";
import { addToCart, addToCartUnsafe, addToUsersCart } from "../../actions";
import PageNotFound from "../pages/404.jsx";

class LeftSideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      nav1: null,
      nav2: null
    };
  }

  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2
    });
  }

  // determines if the user is logged in, then either adds the product to that users account,
  // or adds it to the state of the 'guest account'
  addToCartClicked = (product, quantity) => {
    const productToAdd = this.props.product;

    if (this.props.isLoggedIn) {
      this.props.addToUsersCart(productToAdd, quantity);
    } else {
      this.props.addToCart(productToAdd, quantity);
    }
  };

  filterClick() {
    document.getElementById("filter").style.left = "-15px";
  }
  backClick() {
    document.getElementById("filter").style.left = "-365px";
  }

  render() {
    const { symbol, product, addToCart, addToCartUnsafe } = this.props;
    console.log("this.props in LeftSideBar from");
    console.log(this.props);

    return (
      <div>
        <Helmet>
          <title>E-Commerce | Store </title>
        </Helmet>

        <Breadcrumb parent={"Product"} title={product.name} />

        {/*Section Start*/}
        {product ? (
          <section className="section-b-space">
            <div className="collection-wrapper">
              <div className="container">
                <div className="row">
                  <div className="col-sm-3 collection-filter" id="filter">
                    <div className="collection-mobile-back pl-5">
                      <span onClick={this.backClick} className="filter-back">
                        <i className="fa fa-angle-left" aria-hidden="true"></i>{" "}
                        back
                      </span>
                    </div>
                    <Service />
                  </div>
                  <div className="col-lg-9 col-sm-12 col-xs-12">
                    <div className="">
                      <div className="row">
                        <div className="col-xl-12">
                          <div className="filter-main-btn mb-2">
                            <span
                              onClick={this.filterClick}
                              className="filter-btn"
                            >
                              <i
                                className="fa fa-filter"
                                aria-hidden="true"
                              ></i>{" "}
                              filter
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-6 product-thumbnail">
                          <img
                            src={product.image}
                            alt=""
                            className="img-fluid"
                          ></img>
                        </div>
                        <DetailsWithPrice
                          symbol={symbol}
                          product={product}
                          navOne={this.state.nav1}
                          addToCartClicked={this.addToCartClicked}
                          BuynowClicked={addToCartUnsafe}
                        />
                      </div>
                    </div>
                    <DetailsTopTabs product={product} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <PageNotFound />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  let productId = Number(ownProps.match.params.sku);
  let foundProduct1 = state.data.products.find(el => el.sku === productId);
  let foundProduct2 = state.data.computersAndTablets.find(
    el => el.sku === productId
  );
  let foundProduct3 = state.data.cellPhones.find(el => el.sku === productId);
  let foundProduct4 = state.data.headphones.find(el => el.sku === productId);
  let foundProduct5 = state.data.appliances.find(el => el.sku === productId);

  // function to determine which array in state to look through
  function decideWhichArray() {
    switch (!undefined) {
      case foundProduct1:
        return foundProduct1;
      // break;
      case foundProduct2:
        return foundProduct2;
      // break;
      case foundProduct3:
        return foundProduct3;
      // break;
      case foundProduct4:
        return foundProduct4;
      // break;
      case foundProduct5:
        return foundProduct5;
      // break;
      default:
        return "product no where to be found";
    }
  }

  console.log("state from mapStateToProps in LeftSideBar");
  console.log(state);

  return {
    // product: state.data.products.find(el => el.sku === productId),
    isLoggedIn: state.user.isLoggedIn,
    product: decideWhichArray(),

    symbol: state.data.symbol
  };
};

export default connect(mapStateToProps, {
  addToCart,
  addToCartUnsafe,
  addToUsersCart
})(LeftSideBar);
