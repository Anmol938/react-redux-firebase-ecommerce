import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomePageLayout = props => {
                console.log("home page layout component");
    return (
        <div className="fullHeight">
            <Header {...props} />
                {props.children}
            <Footer/>

        </div>
    );
};

export default HomePageLayout;