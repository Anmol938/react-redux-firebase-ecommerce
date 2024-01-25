import React,{useState, useEffect} from 'react';
import './styles.scss';

import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';


import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signUpUser, resetAllAuthForms} from './../../redux/User/user.actions';
import { createSelector } from 'reselect';




const selectUser = (state) => state.user;

const mapState = createSelector([selectUser], (user) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError,
}));

const SignUp = props => {
        const {signUpSuccess,signUpError} = useSelector(mapState);
        const dispatch = useDispatch();
        const [displayName, setDisplayName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [errors, setErrors] = useState([]);

        useEffect( () => {
            if(signUpSuccess){
                reset();
                dispatch(resetAllAuthForms());
                navigate('/'); // this is a redundant code to navigate to home page once the user has registered itself, this has been also done 
                               // on app.js directly 

            }

        }, [signUpSuccess]);

        useEffect(() => {
            console.log('signUpError:', signUpError);
        
            if (Array.isArray(signUpError) && signUpError.length > 0) {
                setErrors(signUpError);
            }
        }, [signUpError]);
        

        const reset = () => {
            setDisplayName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setErrors([]);
        };
             
        const navigate  = useNavigate();

      const handleFormSubmit =  event => {
            event.preventDefault();
            dispatch(signUpUser({displayName,email,password,confirmPassword}));


           
        } 


  

        const configAuthWrapper = {
            headline: 'Registration'
        }; 


        return(

           <AuthWrapper {...configAuthWrapper} >

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


                    <form onSubmit={handleFormSubmit}>
                                    <FormInput
                                        type="text"
                                        name="displayName"
                                        value={displayName}
                                        placeholder="Full Name"
                                        handleChange = {e => setDisplayName(e.target.value)}
                                    />

                                    <FormInput
                                        type="email"
                                        name="email"
                                        value={email}
                                        placeholder="Email"
                                        handleChange ={e => setEmail(e.target.value)}
                                    
                                    />
                                    <FormInput
                                        type="password"
                                        name="password"
                                        value={password}
                                        placeholder="password"
                                        handleChange ={e => setPassword(e.target.value)}
                                    
                                    />
                                    <FormInput
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        placeholder="confirmPassword"
                                        handleChange ={e => setConfirmPassword(e.target.value)}
                                    
                                    />

                        <Button type="submit">
                        Register
                       </Button>

                    </form>
                    </div>    
         </AuthWrapper>
        );
    }


export default SignUp;