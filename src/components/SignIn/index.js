import React, {useState} from 'react';
import './styles.scss';

import { signInWithGoogle, auth } from '../../firebase/utils';

import FormInput from '../forms/FormInput';
import Button from './../forms/Button';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthWrapper from '../AuthWrapper';
import {Link} from 'react-router-dom';

import Recovery from '../../pages/Recovery';

import { useNavigate } from 'react-router-dom';



const  SignIn = props => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const resetForm = () => {
        setEmail('');
        setPassword('');

    }

    const navigate = useNavigate();

    const handleSubmit = async e =>{
        e.preventDefault();
        



        try{

            await auth.signInWithEmailAndPassword(email,password);
            resetForm();
            navigate('/');  // this is a redundant code to navigate to home page once the user has registered itself, this has been also done 
                            // on app.js directly 

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
                            <Button onClick={signInWithGoogle}>
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