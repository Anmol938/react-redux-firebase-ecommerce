import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSelector } from 'reselect';
import { checkUserIsAdmin } from '../utils';

const selectUser = (state) => state.user;

const mapState = createSelector(
  [selectUser],
  (user) => ({
    currentUser: user.currentUser
  })
);

const useAdminAuth = props => {
    const {currentUser} = useSelector(mapState);
    const navigate = useNavigate();
    useEffect(() =>{
        if(!checkUserIsAdmin(currentUser)){
           navigate('/login'); 
        }

    },[currentUser] )

    return currentUser;
}

export default useAdminAuth;