import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAxf37k_g677BIGnHHKYjrCAZcsc_I_ArY",
    authDomain: "ecommerce-website-837bd.firebaseapp.com",
    projectId: "ecommerce-website-837bd",
    storageBucket: "ecommerce-website-837bd.appspot.com",
    messagingSenderId: "48625403511",
    appId: "1:48625403511:web:2e1c96efdc9b549af7e872",
    measurementId: "G-6X4S6LQN4Y"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Create an auth instance
export const auth = firebase.auth();
export const firestore = firebase.firestore();


 export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt:'select_account'});




export const handleUserProfile = async ( userAuth, additionalData ) => {
  if (!userAuth) return;
  const { uid } = userAuth;

  const userRef = firestore.doc(`users/${uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const timestamp = new Date();
   // const userRoles = ['user'];

    try {
      await userRef.set({
        displayName,
        email,
        createdDate: timestamp,
       // userRoles,
        ...additionalData
      });
    } catch(err) {
      // console.log(err);
    }
  }

  return userRef;
};
