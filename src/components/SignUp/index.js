import React,{useState} from 'react';
import './styles.scss';

import FormInput from '../forms/FormInput';
import Button from '../forms/Button';
import AuthWrapper from '../AuthWrapper';

import {auth, handleUserProfile} from './../../firebase/utils';

import { useNavigate } from 'react-router-dom';




const SignUp = props => {

        const [displayName, setDisplayName] = useState('');
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [errors, setErrors] = useState([]);


        const reset = () => {
            setDisplayName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setErrors([]);
        };
             
        const navigate  = useNavigate();

      const handleFormSubmit = async event => {
            event.preventDefault();
            


            if(password !== confirmPassword)
              {
                const err = ['Password Don\'t match'];
                setErrors(err);
                return;
                
            }
            
            try{
                const{user} = await auth.createUserWithEmailAndPassword(email,password);
            
                await handleUserProfile(user, {displayName});
                reset();
                navigate('/'); // this is a redundant code to navigate to home page once the user has registered itself, this has been also done 
                               // on app.js directly 

            }
            catch(err)
            {
                console.log(err)
            }
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