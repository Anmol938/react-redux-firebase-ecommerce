import React from "react";

import './styles.scss';

const AuthWrapper  = ({headline, children}) => {

    return(
        <div className="authWrapper">
            <div className="wrap">
                {
                    headline && <h2>{}Login</h2>
                }

                <div className="children">
                {children && children}
                </div>
            </div>
        </div>
    );
}

export default AuthWrapper;