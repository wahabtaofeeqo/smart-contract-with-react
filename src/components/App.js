import React, {Component} from 'react';
import './App.css';
import Web3 from "web3";

import MarketPlace from '../abis/MarketPlace.json';
import {Route, Routes, BrowserRouter} from "react-router-dom";
import Home from "./Home";
import NotFound from "./NotFound";
import AddProducts from "./AddProducts";
import Exchange from "./Exchange";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Products from "../views/Products";


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      products: [],
      loading:false,
      productCount: 0
    }

    this.createProduct = this.createProduct.bind(this)
    this.purchaseProduct = this.purchaseProduct.bind(this);
  }

  render() {
    return (
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={ <Home account={this.state.account} /> } />
            <Route path="/products" element={ <Products marketPlace={this.purchaseProduct} /> }  />
            <Route path="/add-products" element={ <AddProducts marketPlace={this.state.marketPlace} account={this.state.account} /> } />
            <Route path="/exchange" element={ <Exchange/> } />
            <Route path="*" element={ <NotFound /> } />
          </Routes>
        </BrowserRouter>
    )
  }

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadData();
  }

  async loadWeb3() {
    if(typeof window.web3 !== 'undefined') {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      toast.error('Your browser does not support this');
    }
  }

  async loadData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    this.setState({account: accounts[0]})

    const networkId = await web3.eth.net.getId();
    const networkData = MarketPlace.networks[networkId];

    if (networkData) {
      let marketPlace = new web3.eth.Contract(MarketPlace.abi, networkData.address);
      this.setState({marketPlace});
    }
    else {
      toast.error('Not deployed');
    }

    this.observeAccount();
  }

  observeAccount() {
    setInterval(async () => {
      let account = await window.web3.eth.getAccounts();
      if(account && account[0] !== this.state.account) {
        this.setState({account: account})
      }
    }, 1000);
  }

  async createProduct(values) {
    // this.state.marketPlace.methods.createProduct(values.name, values.price, values.description).send({ from: this.state.account }, async (err, response) => {
    //   if(err) {
    //     toast.error('Product could not created')
    //   }
    //   else {
    //     toast.success('Product created successfully')
    //   }
    //   this.setState({loading: false})
    // })
  }

  async purchaseProduct(id, product) {
    if (product.owner === this.state.account) {
      toast.warn('You cant buy your product')
    }
    else {
      this.setState({loading: true});
      this.state.marketPlace.methods.purchaseProduct(id).send({from: this.state.account, value: product.price}, async (err, response) => {
        if(err) {
          toast.error('Operation not succeeded');
        }
        else {
          toast.success('Operation succeeded');
        }
        this.setState({loading: false})
      })
    }
  }
}

export default App;