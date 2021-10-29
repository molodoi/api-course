import React from "react";
import ReactLogo from '../../img/react.svg';
import SfLogo from '../../img/symfony.svg';

const HomePage = props => {
    return (
        <div className="container mb-5">
            <div className="row">
                <div className="col">
                    <div className="jumbotron text-center">
                        <h1 className="display-3">Hello, world!</h1>
                        <p className="lead">
                            Welcome on this little customers/invoices CRM app made with love with <a href="https://api-platform.com/" target="_blank">api-platform.com</a> & <a href="https://fr.reactjs.org/" target="_blank">react.</a>                          
                        </p>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <img src={SfLogo} alt="Syfmony Logo" className="logos mx-auto d-block img-fluid"/>
                </div>
                <div className="col">
                    <img src={ReactLogo} alt="React Logo" className="logos mx-auto d-block img-fluid"/>
                </div>
            </div>
        </div>
    );
};

export default HomePage;