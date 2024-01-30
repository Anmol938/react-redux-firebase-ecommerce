import { auth,firestore } from "../../firebase/utils";


export const handleResetPasswordAPI = (email) => {

    
      return new Promise((resolve, reject) => {
        const userExists = firestore
          .collection('users')
          .where('email', '==', email)
          .get()
          .then((querySnapshot) => {
            if (querySnapshot.empty) {
              console.log('Email does not exist in the database.');
              const err = ["Email not found. Please try again"];
              reject(err);
              return;
            }
    
            const config = {
              url: 'http://localhost:3000/login',
            };
    
            auth.sendPasswordResetEmail(email, config)
              .then(() => {
                resolve();
              })
              .catch(() => {
                const err = "Email not found. Please try again";
                reject(err);
              });
          })
          .catch((error) => {
            console.error('Error checking user existence:', error);
            const err = "Error checking user existence. Please try again.";
            reject(err);
          });
      });
};