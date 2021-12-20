import React,{ Component } from 'react';
import {Link} from "react-router-dom";

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-light fixed-top bg-light flex-md-nowrap shadow-sm">
                <Link
                    className="navbar-brand col-sm-3 col-md-2 mr-0"
                    to="/"
                    rel="noopener noreferrer">
                    Smart Products
                </Link>

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