import React from 'react';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import Button from './../forms/Button';
import FormInput from './../forms/FormInput';
import { auth, firestore } from '../../firebase/utils';
import { useNavigate } from 'react-router-dom';

const initialState = {
  email: '',
  errors:[]
};

function EmailPassword() {
  const navigate = useNavigate();

  const [state, setState] = React.useState({ ...initialState });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email } = state;

    try {
      const userExists = await firestore
        .collection('users')
        .where('email', '==', email)
        .get();

      if (userExists.empty) {
        console.log('Email does not exist in the database.');
        return;
      }

      const config = {
        url: 'http://localhost:3000/login'
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          console.log('Password Reset');
          navigate('/login'); // Use the navigate function to go to the login page
        })
        .catch(() => {
          console.log('Something went wrong');
        });
    } catch (err) {
      // Handle any errors here
    }
  };

  const { email } = state;

  const configAuthWrapper = {
    headline: 'Email Password'
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={handleChange}
          />
          <Button type="submit">Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
}

export default EmailPassword;
