import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Auth() {
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [signupData, setSignupData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    const [loginErrors, setLoginErrors] = useState({});
    const [signupErrors, setSignupErrors] = useState({});

    const isEmailValid = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const isPasswordValid = (password) => {
        return password.length >= 6;
    };

    const isFirstNameValid = (firstName) => {
        return firstName.trim() !== '';
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!isEmailValid(loginData.email)) {
            errors.email = 'Invalid email address';
        }
        if (!isPasswordValid(loginData.password)) {
            errors.password = 'Password should be at least 6 characters';
        }
        const API_URL = 'http://localhost:3000';
        if (Object.keys(errors).length === 0) {
            try {
                // Make API request for login
                const response = await axios.post(`${API_URL}/api/v1/login`, loginData);
                console.log(response.data); // Log the response from the server

                // Redirect to home on successful login
                navigate('/home');
            } catch (error) {
                console.error('Error during login:', error.message);
                // Handle login error, e.g., display a message to the user
            }
        } else {
            setLoginErrors(errors);
        }
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!isFirstNameValid(signupData.firstName)) {
            errors.firstName = 'First name is required';
        }
        if (!isEmailValid(signupData.email)) {
            errors.email = 'Invalid email address';
        }
        if (!isPasswordValid(signupData.password)) {
            errors.password = 'Password should be at least 6 characters';
        }

        if (Object.keys(errors).length === 0) {
            try {
                // Make API request for signup
                const response = await axios.post('/api/v1/signup', signupData);
                console.log(response.data); // Log the response from the server

                // Redirect to home on successful signup
                navigate('/home');
            } catch (error) {
                console.error('Error during signup:', error.message);
                // Handle signup error, e.g., display a message to the user
            }
        } else {
            setSignupErrors(errors);
        }
    };

    return (
        <section className='loginSec'>
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                        <h2 className='secHeading'>
                            Login
                        </h2>
                        <form onSubmit={handleLoginSubmit} className="loginForm">
                            <div className="inputCont">
                                <input
                                    type="email"
                                    placeholder='Enter Your Email'
                                    value={loginData.email}
                                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                />
                                {loginErrors.email && <span className="error text-white">{loginErrors.email}</span>}
                            </div>
                            <div className="inputCont">
                                <input
                                    type="password"
                                    placeholder='Password'
                                    value={loginData.password}
                                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                />
                                {loginErrors.password && <span className="error text-white">{loginErrors.password}</span>}
                            </div>
                            <button type="submit" className="themeBtn">
                                Login
                            </button>
                        </form>
                    </div>
                    <div className="col-md-6">
                        <h2 className='secHeading'>
                            Signup
                        </h2>
                        <form onSubmit={handleSignupSubmit} className="loginForm">
                            <div className="container-fluid p-0">
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="inputCont">
                                            <input
                                                type="text"
                                                placeholder='Enter Your First Name'
                                                value={signupData.firstName}
                                                onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                                            />
                                            {signupErrors.firstName && <span className="error text-white">{signupErrors.firstName}</span>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="inputCont">
                                            <input
                                                type="text"
                                                placeholder='Enter Your Last Name'
                                                value={signupData.lastName}
                                                onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="inputCont">
                                <input
                                    type="email"
                                    placeholder='Enter Your Email'
                                    value={signupData.email}
                                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                                />
                                {signupErrors.email && <span className="error text-white">{signupErrors.email}</span>}
                            </div>
                            <div className="inputCont">
                                <input
                                    type="password"
                                    placeholder='Password'
                                    value={signupData.password}
                                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                                />
                                {signupErrors.password && <span className="error text-white">{signupErrors.password}</span>}
                            </div>
                            <button type="submit" className="themeBtn">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Auth;
