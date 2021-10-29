import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Navbar = ({ history }) => {
    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
    const [open, setOpen] = useState(false);

    const toggle = () => setOpen(!open);

    const handleLogout = () => {
        AuthAPI.logout();
        setIsAuthenticated(false);
        setOpen(false);
        toast.info('Vous êtes déconnecté');
        history.push('/login');
    };

    return (
        <div className="container-fluid p-0 mb-5">
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top shadow-sm">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        SymReact
                    </NavLink>
                    <button onClick={toggle} className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={open ? "collapse navbar-collapse show" : "collapse navbar-collapse"} id="navbarColor03">
                        <ul className="navbar-nav me-auto">
                            <li className="nav-item justify-content-md-center">
                                <NavLink onClick={toggle} className="nav-link" to="/customers">
                                    Clients
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink onClick={toggle} className="nav-link" to="/invoices">
                                    Factures
                                </NavLink>
                            </li>
                        </ul>
                        <hr className="d-block d-lg-none"/>
                        <ul className="navbar-nav ml-auto">
                            {(!isAuthenticated && (
                                <>
                                    <li className="nav-item mx-1 mb-2">
                                        <NavLink onClick={toggle} to="/register" className="btn btn-outline-default btn-sm">
                                            Inscription
                                        </NavLink>
                                    </li> 
                                    <li className="nav-item mx-1">
                                        <NavLink onClick={toggle} to="/login" className="btn btn-outline-primary btn-sm">
                                            Connexion !
                                        </NavLink>
                                    </li> 
                                </>
                            )) || (
                                <li className="nav-item mx-1">
                                    <button onClick={handleLogout} className="btn btn-danger btn-sm">
                                        Déconnexion
                                    </button>
                                </li>
                            )}    
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;