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
    const [loading, setLoading] = useState(false);

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

        if (Object.keys(errors).length === 0) {
            try {
                setLoading(true);
                const response = await axios.post('http://localhost:5000/api/login', loginData);

                if (response && response.data && response.data.authToken) {
                    // Store the token securely, e.g., using HTTP-only cookies
                    const authToken = response.data.authToken;

                    // Store the token in your preferred way (e.g., in local storage or a state variable)
                    // For example, using localStorage:
                    localStorage.setItem('authToken', authToken);
                    // Display a success message or redirect to home
                    navigate('/home');
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.error || 'Unknown error';
                alert(errorMessage); // Display the error to the user
                console.error('Error during login:', errorMessage);
            } finally {
                setLoading(false);
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
                setLoading(true);
                // Make a POST request to the signup endpoint
                const response = await axios.post('http://localhost:5000/api/signup', signupData);

                // Check if the response has a 'data' property before accessing it
                if (response && response.data) {
                    // Redirect to home on successful signup
                    navigate('/home');
                } else {
                    console.error('Unexpected response format:', response);
                }
            } catch (error) {
                const errorMessage = error.response?.data?.error || 'Unknown error';
                alert(errorMessage); // Display the error to the user
                console.error('Error during signup:', errorMessage);
            } finally {
                setLoading(false);
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
                            <button type="submit" className="themeBtn" disabled={loading}>
                                {loading ? 'Logging in...' : 'Login'}
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
                            <button type="submit" className="themeBtn" disabled={loading}>
                                {loading ? 'Signing up...' : 'Register'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Auth;
