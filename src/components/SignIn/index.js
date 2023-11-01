import React, {Component} from 'react';
import './styles.scss';

import { signInWithGoogle, auth } from '../../firebase/utils';

import FormInput from '../forms/FormInput';
import Button from './../forms/Button';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthWrapper from '../AuthWrapper';
import {Link} from 'react-router-dom';

import Recovery from '../../pages/Recovery';


const initialState = {
    email: '',
    password:''
};



class SignIn extends Component{


    constructor(props){
        super(props);
        this.state = {
            ...initialState
        };
        
        this.handleChange = this.handleChange.bind(this);
    }




    handleChange(e){

        const{name, value} = e.target;
        this.setState({
            [name]:value
        });
    }




    handleSubmit = async e =>{
        e.preventDefault();
        const {email, password} = this.state;


        try{

            await auth.signInWithEmailAndPassword(email,password);
            this.setState({
                ...initialState
            });

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

    render()
    {
        const {email,password} = this.state;
        const configAuthWrapper = {
            headline: 'LogIn'
        };
        return(
            
            <AuthWrapper {...configAuthWrapper}>
                <div className='formWrap'>
                    <form onSubmit={this.handleSubmit}>
                       
                       <FormInput
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                        handleChange={this.handleChange}
                       />
                       
                       <FormInput
                        type="password"
                        name="password"
                        value={password}
                        placeholder="password"
                        handleChange={this.handleChange}
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
    
}

export default SignIn;