import React, { useState, useEffect } from 'react';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import Button from './../forms/Button';
import FormInput from './../forms/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword , resetAllAuthForms} from './../../redux/User/user.actions';
import { useNavigate } from 'react-router-dom';

const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError,
});

const EmailPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (resetPasswordSuccess) {
      console.log('Password Reset');
      dispatch(resetAllAuthForms());
      navigate('/login'); // Use the navigate function to go to the login page
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    console.log(resetPasswordError+ "....anmol.....");
    console.log("#####" + resetPasswordError.type);
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    console.log("\nline 2 " + errors)  
    }
  }, [resetPasswordError]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
   
  };

  const configAuthWrapper = {
    headline: 'Email Password',
  };

  // console.log(resetPasswordError + "\n lola" + resetPasswordError);
  // console.log(errors);
  // console.log(resetPasswordError + "\n lola" + resetPasswordError);

  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className='formWrap'>
      {     
                    errors.length  > 0 &&(

                        <ul>
                            {
                                errors.map((err, index) => {

                                    return(
                                        <li key={index}>
                                            {err}
                                        </li>
                                    );
                                })
                            }
                        </ul>
                    )
                }
        <form onSubmit={handleSubmit}>
          <FormInput
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Button type='submit'>Email Password</Button>
        </form>
        
      </div>
    </AuthWrapper>
  );
};

export default EmailPassword;
