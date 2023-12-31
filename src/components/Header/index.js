import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.jpg';

import { Link } from 'react-router-dom';
import {auth} from "./../../firebase/utils"

import { connect } from 'react-redux';

const Header = props => {

    const {currentUser} = props;

    return (
        <header className="header">
         <div className='wrap'>
            <div className='logo'>
                <Link to='/'>
                <img src={Logo} alt="Logo image_replica"/>
                </Link>
            </div>

            <div className='callToActions'>

                {currentUser && (

                    <ul>
                        <li>
                            <Link to="/Dashboard"> My Account </Link>
                        </li>

                        <li>
                            <span onClick={() => auth.signOut()}>
                                LOGOUT
                            </span>
                        </li>
                    </ul>
                )

                }


                {!currentUser && (
       <ul>
        {/* <li>
           <Link to="/Dashboard"> Dashboard </Link>
       </li> */}
       <li>
           <Link to="/registration"> Register </Link>
       </li>

       <li>
           <Link to="/login"> Login </Link>
       </li>
   </ul>


                )}

         
            </div>

            </div>       
        </header>
    );
};


Header.defaultProps ={
    currentUser:null
}

const mapStateToProps = ({user}) => ({
    currentUser: user.currentUser
})


export default connect(mapStateToProps,null)(Header);