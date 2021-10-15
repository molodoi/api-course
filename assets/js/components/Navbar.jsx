import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ history }) => {

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">
                SymReact !
            </NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarColor03">
                <ul className="navbar-nav me-auto">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/customers">
                            Clients
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/invoices">
                            Factures
                        </NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item mx-1">
                        <a className="btn btn-outline-primary btn-sm" href="#">Inscription</a>
                    </li> 
                    <li className="nav-item mx-1">
                        <a className="btn btn-outline-secondary btn-sm" href="#">Connexion</a>
                    </li> 
                </ul>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;