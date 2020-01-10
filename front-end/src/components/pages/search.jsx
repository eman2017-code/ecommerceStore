import React, { Component } from "react";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ""
    };
  }

  // handle change method
  handleChange = e => {
    this.setState({
      value: e.target.value
    });

    // get the results
    this.getResults();
  };

  // filterCategories route
  // will make a fetch call to the elasticsearch api

  render() {
    return (
      <div>
        {/*Search section*/}
        <section className="authentication-page section-b-space">
          <div className="container">
            <section className="search-block">
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    <form className="form-header">
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          aria-label="Amount (to the nearest dollar)"
                          placeholder="Search Products......"
                          value={this.state.value}
                          onChange={this.handleChange}
                        />
                        <div className="input-group-append">
                          <li onClick={this.onClick} className="btn btn-solid">
                            <i className="fa fa-search"></i>Search
                          </li>
                        </div>
                      </div>
                      <br />
                      <br />
                      <div>
                        <h4>
                          <strong>Categories</strong>
                        </h4>
                        <input type="radio" name="category" />
                        "insert category name here"
                        <input type="radio" name="category" />
                        "insert category name here"
                        <br />
                        <input type="radio" name="category" />
                        "insert category name here"
                        <input type="radio" name="category" />
                        "insert category name here"
                        <br />
                        <input type="radio" name="category" />
                        "insert category name here"
                        <input type="radio" name="category" />
                        "insert category name here"
                        <br />
                        <input type="radio" name="category" />
                        "insert category name here"
                        <input type="radio" name="category" />
                        "insert category name here"
                        <br />
                        <input type="radio" name="category" />
                        "insert category name here"
                        <input type="radio" name="category" />
                        "insert category name here"
                        <br />
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      </div>
    );
  }
}

export default Search;
