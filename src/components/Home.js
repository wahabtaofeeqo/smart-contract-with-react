import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Navbar from "./Navbar";

class Home extends Component {

    render() {
        return (
            <div className="h-100 bg-img">
              <Navbar account={this.props.account}/>
              <div className="bg-layer">
                <div className="container h-100">
                  <div className="row h-100 justify-content-center align-content-center pt-4 pt-md-0">
                    <div className="col-md-4 mb-4 mt-5 mt-md-0">
                      <div className="card">
                        <img className="card-img" src="/assets/img/bitcoin-wallet.png" alt="Card image" />
                        <div className="card-img-overlay">
                          <h5 className="card-title">List Product</h5>
                          <Link to="/add-products" className="btn btn-danger btn-action">Continue</Link>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-4 mb-4">
                      <div className="card">
                        <img className="card-img" src="/assets/img/digital-wallet.png" alt="Card image" />
                          <div className="card-img-overlay">
                            <h5 className="card-title">Buy Product</h5>
                            <Link to="/products" className="btn btn-danger btn-action">Continue</Link>
                          </div>
                      </div>
                    </div>

                    <div className="col-md-4 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <img className="card-img" src="/assets/img/wallet.png" alt="Card image" />
                          <div className="card-img-overlay">
                            <h5 className="card-title">Coin Exchange</h5>
                            <Link to="/exchange" className="btn btn-danger btn-action">Continue</Link>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
        );
    }
}

export default Home