import React from 'react';
import './styles.scss';
import Logo from './../../assets/logo.jpg';

import { Link } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import {createSelector} from 'reselect';
import { signOutUserStart } from '../../redux/User/user.actions';

const selectUser = (state) => state.user;


 const mapState = createSelector(
    [selectUser],
    (user) => ({
      currentUser: user.currentUser,
    })
  );


const Header = props => {
    const dispatch = useDispatch();
    const {currentUser} = useSelector(mapState);

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
         <div className='wrap'>
            <div className='logo'>
                <Link to='/'>
                <img src={Logo} alt="Logo image_replica"/>
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
            <div className='callToActions'>

                {currentUser && (

                    <ul>
                        <li>
                            <Link to="/Dashboard"> My Account </Link>
                        </li>

                        <li>
                            <span onClick={handleLogout}>
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




export default Header;