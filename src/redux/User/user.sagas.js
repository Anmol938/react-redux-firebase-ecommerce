import userTypes from "./user.types";
import { toast } from 'react-toastify';
import {takeLatest, call, all, put} from 'redux-saga/effects';
import { signInSuccess, signOutUserSuccess, userError, resetPasswordSuccess } from "./user.actions";
import {  auth, handleUserProfile, getCurrentUser, GoogleProvider } from '../../firebase/utils';
import { handleResetPasswordAPI } from "./user.helpers";

export function* getSnapshotFromUserAuth(user, additionalData={}){
    try{
        const userRef = yield call(handleUserProfile, {userAuth: user, additionalData}); // only passing userAuth and no additional data
        const snapshot = yield userRef.get();
        console.log(userRef); 
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        ); 
       
    } catch(err)
    {
        //console.log(err);
    }


}


export function* emailSignIn({payload: {email,password}}){

            try{

        const {user} = yield auth.signInWithEmailAndPassword(email,password);
        yield getSnapshotFromUserAuth(user);
               
      

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


export function* onEmailSignInStart(){
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START,emailSignIn);
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) 
        {return;}

        yield getSnapshotFromUserAuth(userAuth);
        

    }catch(err)
    {
        //console.log(err);
    }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signOutUser(){
    try{
        yield auth.signOut();
        yield put(
            signOutUserSuccess()
        )
    }
    catch(err)
    {
        //console.log(err);
    }
}

export function* onSignOutUserStart(){
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* signUpUser({payload: {
    displayName,
    email,
    password,
    confirmPassword
}}){
    console.log("Emailllll kya hai bhai", email);
    console.log("display name kya hai bhai", displayName);
        
        
         if(password !== confirmPassword)
              {
                const err = ['Password Don\'t match'];
                yield put(
                    userError(err)
                );
                return;
            }
            
            try{
                const{user} = yield auth.createUserWithEmailAndPassword(email,password);
                const additionalData = {displayName};
                yield getSnapshotFromUserAuth(user,additionalData);
                
            }
            catch(err)
            {
                console.log(err)
            }
}

export function* onSignUpUserStart(){
    yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* resetPassword({payload : {email}}){
    try {
       yield call(handleResetPasswordAPI, email);
       yield put(
        resetPasswordSuccess()
        );
      } catch (err) {
        yield put(userError(err)
        );
      }
}

export function* onResetPasswordStart(){
    yield takeLatest(userTypes.RESET_PASSWORD_START,resetPassword);
}

export function* googleSignIn(){
    try{
        const {user} = yield auth.signInWithPopup(GoogleProvider);
        yield getSnapshotFromUserAuth(user);
        
      }catch(err){
          //console.log(err);
        } 
    
}


export function* onGoogleSignInStart(){
    yield takeLatest(userTypes.GOOGLE_SIGN_IN_START,googleSignIn);
}



export default function* userSagas(){
    yield all([
                call(onEmailSignInStart),
                call(onCheckUserSession),
                call(onSignOutUserStart),
                call(onSignUpUserStart),
                call(onResetPasswordStart),
                call(onGoogleSignInStart)
              ])
}