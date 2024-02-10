import axios from 'axios';

export const checkUserIsAdmin = currentUser => {
    if(!currentUser || !Array.isArray(currentUser.userRoles)) return false;

    const {userRoles} = currentUser;

    if(userRoles.includes('admin')) return true;


    return false;
}

export const apiInstance = axios.create({
    baseURL: 'http://127.0.0.1:5001/ecommerce-website-837bd/us-central1/api'
  });