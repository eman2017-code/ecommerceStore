import React, { Component, Fragment } from "react";
import Breadcrumb from "../../common/breadcrumb";
import UpdateProductModal from "./update-product-modal.js";
import { Edit, Trash2 } from "react-feather";
import { connect } from "react-redux";
import { deleteProduct, updateProduct } from "../../../actions";
import store from "../../../store";



export class Product_list extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      productToUpdate: {}
    }
  }

  // checking to see data is an empty object
  isEmpty(obj) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) return false;
    }
    return true;
  }

  openModal = (productData) => {
    console.log('productData:', productData);

		this.setState({
      productToUpdate: productData,
      open: true
    });

    console.log('productToUPdate after change:', this.state.productToUpdate);
	}

	closeModal = () => {
    console.log('closeModal');
		this.setState({
      open: false,
		})
	}

  render() {

    return (
      <Fragment>
        <Breadcrumb title="Current Inventory" parent="Physical" />
        <div className="container-fluid">
          <div className="row products-admin ratio_asos">
            {this.props.products.map((product, i) => {
              return (
                <div className="col-xl-3 col-sm-6" key={i}>
                  <div className="card">
                    <div className="products-admin">
                      <div className="card-body product-box">
                        <div className="img-wrapper">
                          <div className="lable-block">
                            {product.tag ? (
                              <span className="lable3">{product.tag}</span>
                            ) : (
                              ""
                            )}
                            {product.discount ? (
                              <span className="lable4">{product.discount}</span>
                            ) : (
                              ""
                            )}
                          </div>
                          <div className="front">
                            <a className="bg-size">
                              <img
                                className="img-fluid blur-up bg-img lazyloaded"
                                src={product.image}
                              />
                            </a>
                            <div className="product-hover">
                              <ul>
                                <li>
                                  <button 
                                    className="btn"
                                    type="button"
                                    onClick={() => this.openModal(product)} 
                                    >
                                    <Edit className="editBtn" />
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="btn"
                                    type="button"
                                    onClick={() => this.props.deleteProduct(product.upc)}
                                  >
                                    <Trash2 className="deleteBtn" />
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="product-detail">
                          <a>
                            {" "}
                            <h6>{product.name}</h6>
                          </a>
                          <h4>
                            {/* {symbol} */}
                            {product.price}
                          </h4>
                          <br />
                          <span className="lable4">{product.description}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {this.state.open ?
          <UpdateProductModal 
            open={this.state.open}
            closeModal={this.closeModal}
            product={this.state.productToUpdate}
            updateProduct={this.props.updateProduct}
            />
        :
          null
        }
        
      </Fragment>
    );
  }
}



// export default Product_list;
const mapStateToProps = state => ({
  products: state.data.products,
  symbol: state.data.symbol
});

export default connect(mapStateToProps, { deleteProduct, updateProduct })(Product_list);


