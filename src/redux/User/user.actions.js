import userTypes from './user.types';
import { toast } from 'react-toastify';
import {  auth, handleUserProfile, firestore, GoogleProvider } from '../../firebase/utils';
import { useNavigate } from 'react-router-dom';



export const setCurrentUser = user => ({
    type : userTypes.SET_CURRENT_USER,
    payload: user
});

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS
})

export const signInUser = ({email, password}) => async dispatch => {

    try{

        await auth.signInWithEmailAndPassword(email,password);
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        });
       

    }
    catch(err)
    {
        console.log(err);
        if (err.code === "auth/weak-password") {
            // Handle badly formatted email
            toast.error("Weak password, please make sure the password length is atleast 6 characters");
            window.alert("Weak password, please make sure the password length is atleast 6 characters");
          } else {
            // Handle other authentication errors
            toast.error("An error occurred while logging in. Please try again later.");
            window.alert("An error occurred while logging in. Please try again later.");
          }
    }
}


export const signUpUser = ({displayName , email , password, confirmPassword}) => async dispatch => {
        
        console.log("Emailllll kya hai bhai", email);
        console.log("display name kya hai bhai", displayName);
        
        
         if(password !== confirmPassword)
              {
                const err = ['Password Don\'t match'];
                dispatch({
                    type: userTypes.SIGN_UP_ERROR,
                    payload: err
                })
                return;
                
            }
            
            try{
                const{user} = await auth.createUserWithEmailAndPassword(email,password);
            
                await handleUserProfile(user, {displayName});
                dispatch({
                    type:userTypes.SIGN_UP_SUCCESS,
                    payload: true
                });
                
            }
            catch(err)
            {
                console.log(err)
            }

};

export const resetPassword = ({ email }) => async (dispatch) => {
    try {
      const userExists = await firestore
        .collection('users')
        .where('email', '==', email)
        .get();
  
      if (userExists.empty) {
        console.log('Email does not exist in the database.');
        const err = ["Email not found. Please try again"];
        dispatch({
          type: userTypes.RESET_PASSWORD_ERROR,
          payload: err
        });
        return;
      }
  
      const config = {
        url: 'http://localhost:3000/login',
      };
  
      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          dispatch({
            type: userTypes.RESET_PASSWORD_SUCCESS,
            payload: true,
          });
        })
        .catch(() => {
          const err = "Email not found. Please try again";
          dispatch({
            type: userTypes.RESET_PASSWORD_ERROR,
            payload: err,
          });
          //   console.log('Something went wrong');
        });
    } catch (err) {
      // Handle any errors here
    }
  };
  

   export const signInWithGoogle = () => async dispatch => {

    try{
    await auth.signInWithPopup(GoogleProvider)
    .then(() => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true
    });
   
    })
    
  }catch(err){
      //console.log(err);
    } 

  }
