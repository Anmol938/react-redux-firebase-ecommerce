import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.jpg';

import { Link } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import {createSelector} from 'reselect';
import { signOutUserStart } from '../../redux/User/user.actions';
import { selectCartItemsCount } from './../../redux/Cart/cart.selectors';


const mapState = (state) => ({
  currentUser: state.user.currentUser,
  totalNumCartItems: selectCartItemsCount(state)
});

const Header = props => {
    const dispatch = useDispatch();
    const {currentUser, totalNumCartItems } = useSelector(mapState);

    // signOut
    const handleLogout = async () => {
        try {
          dispatch(signOutUserStart());
          // Additional clean-up logic if needed
        } catch (error) {
          console.error('Error during logout:', error);
        }
      };


      return (
        <header className="header">
          <div className="wrap">
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt="SimpleTut LOGO" />
              </Link>
            </div>
    
            <nav>
              <ul>
                <li>
                  <Link to="/">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/search">
                    Search
                  </Link>
                </li>
              </ul>
            </nav>
    
            <div className="callToActions">
    
              <ul>
    
                <li>
                  <Link to="/cart">
                    Your Cart ({totalNumCartItems})
                  </Link>
                </li>
    
                {currentUser && [
                  <li key={1}>
                    <Link to="/dashboard">
                      My Account
                    </Link>
                  </li>,
                  <li key={2}>
                    <span onClick={() => handleLogout()}>
                      LogOut
                    </span>
                  </li>
                ]}
    
                {!currentUser && [
                  <li key={1}>
                    <Link to="/registration">
                      Register
                    </Link>
                  </li>,
                  <li key={2}>
                    <Link to="/login">
                      Login
                    </Link>
                  </li>
                ]}
    
              </ul>
    
    
    
    
    
            </div>
          </div>
        </header>
      );
    };
    


Header.defaultProps ={
    currentUser:null
}




export default Header;