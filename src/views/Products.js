import React, {Component} from "react";
import MarketPlace from "../abis/MarketPlace.json";
import Loader from "../components/Loader";
import {toast} from "react-toastify";
import {Button, Modal} from "react-bootstrap";

class Products extends Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [],
            loading: false,
            showModal: false,

            selectedProduct: null
        }
    }

    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        });
    }

    render() {
        return(
            <>
                {
                    this.state.loading
                        ? <Loader />
                        : <div className="container-fluid bg-light">
                            <div className="container py-0 py-md-5">
                                <div className="row">
                                    {
                                        this.state.products.map((product, key) => {
                                            return(
                                                <div className="col-md-4 mb-4" key={key}>
                                                    <div className="card border-0 rounded-top">
                                                        <div className="card-body">
                                                            <p className="card-title font-weight-bold">{product.name}</p>
                                                            <div className="text-center mb-4">
                                                                <img className="img-thumbnail img-fluid rounded-circle img-product" src="/assets/img/wallet.png"/>
                                                            </div>
                                                            <p className="card-text">
                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                                                ...
                                                            </p>

                                                            <p>
                                                                {
                                                                    window.web3.utils.fromWei(product.price.toString())
                                                                } Ether
                                                            </p>

                                                            <button className="btn btn-outline-danger px-5 btn-sm"
                                                                    onClick={(event => this.viewProduct(product, key))}>View</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                }

                <Modal show={this.state.showModal} onHide={this.toggleModal} size="md" aria-labelledby="dm" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {this.state.selectedProduct ? this.state.selectedProduct.name : ''}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p className="text-muted mb-1">Description</p>
                        <p>
                            {this.state.selectedProduct ? this.state.selectedProduct.description : ''}
                        </p>

                        <p className="text-muted mb-1">Price</p>
                        <p>
                            {
                                this.state.selectedProduct ? window.web3.utils.fromWei(this.state.selectedProduct.price.toString()) : ''
                            } Ether
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.toggleModal}>
                            Close
                        </Button>
                        <Button variant="danger" onClick={this.buyProduct}>
                            Buy
                        </Button>
                    </Modal.Footer>
                </Modal>

            </>
        )
    }

    componentWillMount() {
        this.loadData();
    }

    async loadData() {

        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();

        this.setState({loading: true})
        const networkData = MarketPlace.networks[networkId];
        if (networkData) {
            const marketPlace = new web3.eth.Contract(MarketPlace.abi, networkData.address);
            const productCount = await marketPlace.methods.productCount().call();
            this.setState({productCount})

            for (let i = 1; i <= productCount; i++) {
                const product = await marketPlace.methods.products(i).call();
                if (!product.purchased) {
                    this.setState({products: [...this.state.products, product] })
                }
            }

            this.setState({marketPlace})
        }
        else {
            alert('Not Deployed')
        }
        this.setState({loading: false});
    }

    viewProduct(product, id) {
        this.setState({
            productId: id,
            selectedProduct: product
        })
        this.toggleModal();
    }

    buyProduct = async () => {
        this.setState({loading: true})
        await this.props.purchaseProduct(this.state.productId, this.state.selectedProduct);
        this.setState({
            loading: false,
            showModal: false
        })
    }
}

export default Products;