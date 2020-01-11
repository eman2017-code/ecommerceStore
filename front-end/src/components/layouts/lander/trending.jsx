import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { getTrendingTagCollection } from "../../../services";

import { getProductsByCategory } from '../../../actions'

import SideImageItem from "../common/side-image-item";

class Trending extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log("componentDidMount");
    this.props.getProductsByCategory('electronics')
  }

  render() {
    console.log('electronics:', this.props.electronics)
    const { titan, reebok, rolex, unisex, symbol } = this.props;

    return (
      <div>
        {/*Paragraph*/}
        <section className="p-0">
          <div className="tab-bg">
            <div className="container-fluid">
              <div className="row">
                <div className="col">
                  <div className="title4">
                    <h2 className="title-inner4">trending products</h2>
                    <div className="line">
                      <span></span>
                    </div>
                  </div>
                  <Tabs className="theme-tab">
                    <TabList className="tabs tab-title">
                      <Tab>ELECTRONICS</Tab>
                      <Tab>WATCHES</Tab>
                      <Tab>FAMILY</Tab>
                      <Tab>FASHION</Tab>
                    </TabList>
                    <div className="tab-content-cls">
                      <TabPanel className="tab-content">
                        <div className="row product-tab">
                          {this.props.electronics.map((item, i) => (
                            <div className="tab-box" key={i}>
                              <SideImageItem product={item} symbol={symbol} />
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                      <TabPanel className="tab-content">
                        <div className="row product-tab">
                          {titan.map((item, i) => (
                            <div className="tab-box" key={i}>
                              <SideImageItem product={item} symbol={symbol} />
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                      <TabPanel className="tab-content">
                        <div className="row product-tab">
                          {reebok.map((item, i) => (
                            <div className="tab-box" key={i}>
                              <SideImageItem product={item} symbol={symbol} />
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                      <TabPanel className="tab-content">
                        <div className="row product-tab">
                          {rolex.map((item, i) => (
                            <div className="tab-box" key={i}>
                              <SideImageItem product={item} symbol={symbol} />
                            </div>
                          ))}
                        </div>
                      </TabPanel>
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

Trending.propTypes = {
  getProductsByCategory: PropTypes.func.isRequired
}

const mapStateToProps = (state, ownProps) => ({
  electronics: state.data.electronics,

  titan: getTrendingTagCollection(state.data.products, ownProps.type, "titan"),
  reebok: getTrendingTagCollection(
    state.data.products,
    ownProps.type,
    "reebok"
  ),
  rolex: getTrendingTagCollection(state.data.products, ownProps.type, "rolex"),
  unisex: getTrendingTagCollection(
    state.data.products,
    ownProps.type,
    "unisex"
  ),
  symbol: state.data.symbol
});
export default connect(mapStateToProps, { getProductsByCategory })(Trending);
