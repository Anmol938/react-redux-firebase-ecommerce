import React, { useState, useEffect } from 'react';
import './styles.scss';

import AuthWrapper from './../AuthWrapper';
import Button from './../forms/Button';
import FormInput from './../forms/FormInput';
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordStart, resetUserState} from './../../redux/User/user.actions';
import { useNavigate } from 'react-router-dom';
import { createSelector } from 'reselect';

const selectUser = (state) => state.user;
const mapState = createSelector(
  [selectUser],
  (user) => ({
      resetPasswordSuccess: user.resetPasswordSuccess,
      userErr: user.userErr
  })
);

const EmailPassword = () => {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState([]);
  const { resetPasswordSuccess, userErr } = useSelector(mapState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (resetPasswordSuccess) {
      console.log('Password Reset');
      dispatch(resetUserState());
      navigate('/login'); // Use the navigate function to go to the login page
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    console.log(userErr+ "....anmol.....");
    console.log("#####" + userErr.type);
    if (Array.isArray(userErr) && userErr.length > 0) {
      setErrors(userErr);
    console.log("\nline 2 " + errors)  
    }
  }, [userErr]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPasswordStart({ email }));
   
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
