import React,{ Component } from 'react';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light fixed-top bg-light flex-md-nowrap shadow-sm">
                <a
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    href="http://www.dappuniversity.com/bootcamp"
                    target="_blank"
                    rel="noopener noreferrer">
                    Taoltech Coin Market
                </a>

                <ul className="navbar-nav px-3">
                    <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                        <small className="text-danger"><span id="account">{this.props.account}</span></small>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Navbar