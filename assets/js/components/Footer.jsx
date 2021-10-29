import moment from "moment";
import React from "react";

const Footer = () => {
    // Gestion du format de date
    const formatDate = str => moment(str).format("YYYY");

    return (
        <div className="container-fluid mt-5 bg-secondary position-sticky">
            <div className="row g-0">
                <div className="col">
                    <p className="text-center mt-3">SymReact {formatDate( new Date())} </p>
                </div>
            </div>
        </div>
    );
};


export default Footer;