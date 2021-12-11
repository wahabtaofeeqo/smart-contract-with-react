import React, { Component } from 'react';
import './App.css';
import Web3 from "web3";
import Navbar from "./Navbar";
import MarketPlace from '../abis/MarketPlace.json';
import Main from "./Main";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      products: [],
      loading:false,
      productCount: 0
    }

    this.purchaseProduct = this.purchaseProduct.bind(this);
    this.createProduct = this.createProduct.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              { this.state.loading
                  ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  : <Main
                      products={this.state.products}
                      createProduct={this.createProduct}
                      purchaseProduct={this.purchaseProduct}
                    />
              }
            </main>
          </div>
        </div>
      </div>
    );
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadData();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable()
    }
    else if(window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      alert('Not supported')
    }
  }

  async loadData() {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    console.log(accounts);

    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId();

    const networkData = MarketPlace.networks[networkId];
    if (networkData) {
      const marketPlace = new web3.eth.Contract(MarketPlace.abi, networkData.address);

      const productCount = await marketPlace.methods.productCount().call();
      this.setState({productCount})

      for (let i = 1; i < productCount; i++) {
        const product = await marketPlace.methods.products(i).call();
        this.setState({products: [...this.state.products, product] })
      }

      this.setState({marketPlace})
      this.setState({loading: false});
    }
    else {
      alert('Not Deployed')
    }
  }

  async createProduct(name, price) {
    this.setState({loading: true})
    this.state.marketPlace.methods.createProduct(name, price)
        .send({ from: this.state.account })
        .once('receipt', receipt => {
          this.setState({loading: false})
        })
  }

  async purchaseProduct(id, price) {
    this.setState({loading: true});
    this.state.marketPlace.methods.purchaseProduct(id).send({from: this.state.account, value: price})
        .once('receipt', (receipt) => {
          this.setState({loading: false})
        })
  }
}

export default App;