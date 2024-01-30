import React from 'react';
import './styles.scss';
import {Link} from 'react-router-dom';
import { createSelector } from 'reselect';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { checkUserIsAdmin } from '../../utils';

const selectUser = (state) => state.user;

const mapState = createSelector(
  [selectUser],
  (user) => ({
    currentUser: user.currentUser
  })
);

const AdminToolBar = props => {
    const {currentUser} = useSelector(mapState);
    const isAdmin = checkUserIsAdmin(currentUser);
    if(!isAdmin) return null;
    return(
        <div className='adminToolBar'>
           <ul>
            <li>
            <Link to="/admin">
            My Admin
            </Link>
            </li>
           </ul> 

        </div>
    );
} 

export default AdminToolBar;