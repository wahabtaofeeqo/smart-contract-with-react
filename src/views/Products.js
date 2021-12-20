import React, {Component} from "react";
import MarketPlace from "../abis/MarketPlace.json";

class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: []
        }
    }

    render() {
        return(
            <div className="container-fluid hm-100 bg-light">
                <div className="container py-0 py-md-5">
                    <div className="row">
                        {
                            this.state.products.map(product => {
                                return(
                                    <div className="col-md-4 mb-4">
                                        <div className="card border-0 rounded-top">
                                            <div className="card-body">
                                                <p className="card-title">{product.name}</p>

                                                <p className="card-text">
                                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex.
                                                </p>

                                                <button className="btn btn-outline-danger px-5 btn-sm">Buy</button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.loadData();
    }

    async loadData() {

        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();

        const networkData = MarketPlace.networks[networkId];
        if (networkData) {
            const marketPlace = new web3.eth.Contract(MarketPlace.abi, networkData.address);
            const productCount = await marketPlace.methods.productCount().call();
            this.setState({productCount})

            for (let i = 1; i <= productCount; i++) {
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
}

export default Products;