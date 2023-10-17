import React from "react";
import Directory from "../components/Directory";
import './styles.scss';

const Homepage = props => {

    return (
        <section className="homepage">
            <Directory />    
            <h1>
                Homepage
            </h1>
        </section>
    );
};

export default Homepage;
