import React, {useState, useEffect} from 'react';
import './styles.scss';

import {  } from '../../firebase/utils';

import FormInput from '../forms/FormInput';
import Button from './../forms/Button';


import 'react-toastify/dist/ReactToastify.css';

import AuthWrapper from '../AuthWrapper';
import {Link} from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import {emailSignInStart, googleSignInStart} from './../../redux/User/user.actions';
import {useDispatch, useSelector} from 'react-redux';
import { createSelector } from 'reselect';


const selectUser = (state) => state.user;

const mapState = createSelector(
  [selectUser],
  (user) => ({
    currentUser: user.currentUser
  })
);



const  SignIn = props => {
    const {currentUser} = useSelector(mapState);
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        if(currentUser){
            resetForm();
            navigate('/');  // this is a redundant code to navigate to home page once the user has registered itself, this has been also done 
                            // on app.js directly after the 8th commit or part 8 it is not redundant on app.js its done only here
        }

    }, [currentUser]);

    const resetForm = () => {
        setEmail('');
        setPassword('');

    }


    const handleSubmit =  e =>{
        e.preventDefault();
        dispatch(emailSignInStart({email, password}));        
    }

    const handleGoogleSignIn = () =>{
        dispatch(googleSignInStart());
    }
        
        const configAuthWrapper = {
            headline: 'LogIn'
        };


        return(
            
            <AuthWrapper {...configAuthWrapper}>
                <div className='formWrap'>
                    <form onSubmit={handleSubmit}>
                       
                       <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={(e) => setEmail( e.target.value )}
                        autoComplete="email"
                       />
                       
                       <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="password"
                        handleChange={(e) => setPassword(e.target.value)}
                       />
                       
                       <Button type="submit">
                        Log In
                       </Button>
                       
                       
                       
                    </form>
    

                    <div className='socialSignin'>
                        <div className='row'>
                            <Button onClick={handleGoogleSignIn}>
                                Sign in with Google
                            </Button>
    
                            
                        </div>
                        </div>
                <div className='links'>
                    <Link to='/Recovery'>
                        Reset Password
                    </Link>
                </div>


                </div>
                </AuthWrapper>
        );
    }
    

export default SignIn;