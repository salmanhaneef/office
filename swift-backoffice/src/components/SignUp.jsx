import React, { useState } from 'react';  
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';  

const SignUp = () => {  
    const [user, setUser] = useState('');  
    const [email, setEmail] = useState('');  
    const [password1, setPassword1] = useState('');  
    const [password2, setPassword2] = useState('');  
    const [message, setMessage] = useState('');  
    const [isLoading, setIsLoading] = useState(false);  
    const navigate = useNavigate();  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        if (password1 !== password2) {  
            setMessage('Passwords do not match!');  
            return;  
        }  

        setIsLoading(true);  
        setMessage(''); // Clear previous messages  

        try {  
            const response = await axios.post('http://localhost:5000/signup', { // Ensure the URL is correct  
                fullname: user,  
                email: email,  
                password1: password1,  
                password2: password2,  
            }, {  
                withCredentials: true  // Allow cookies/sessions if using Flask sessions  
            });  

            if (response.status === 200) {  
                console.log(response.data.message, "success");  
                navigate('/dashboard');  
            } else {  
                setMessage(response.data.message);  
            }  
        } catch (error) {  
            if (error.response) {  
                console.error("Sign-up error:", error.response.data);  
                setMessage(error.response.data.message || 'An error occurred during sign-up.');  
            } else {  
                console.error('Error message:', error.message);  
                setMessage('A network error occurred. Please try again later.');  
            }  
        } finally {  
            setIsLoading(false);  
        }  
    };  

    return (  
        <div className="min-h-screen flex items-center justify-center bg-gray-100">  
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">  
                <h2 className="text-4xl font-bold mb-8 text-center text-gray-800">Create Account</h2>  
                <form onSubmit={handleSubmit}>  
                    <div className="mb-6">  
                        <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="fullname">  
                            Full Name  
                        </label>  
                        <input  
                            type="text"  
                            id="fullname"  
                            value={user}  
                            onChange={(e) => setUser(e.target.value)}  
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"  
                            required  
                        />  
                    </div>  
                    <div className="mb-6">  
                        <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="email">  
                            Email  
                        </label>  
                        <input  
                            type="email"  
                            id="email"  
                            value={email}  
                            onChange={(e) => setEmail(e.target.value)}  
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"  
                            required  
                        />  
                    </div>  
                    <div className="mb-6">  
                        <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password1">  
                            Password  
                        </label>  
                        <input  
                            type="password"  
                            id="password1"  
                            value={password1}  
                            onChange={(e) => setPassword1(e.target.value)}  
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"  
                            required  
                        />  
                    </div>  
                    <div className="mb-6">  
                        <label className="block text-gray-600 text-sm font-semibold mb-2" htmlFor="password2">  
                            Confirm Password  
                        </label>  
                        <input  
                            type="password"  
                            id="password2"  
                            value={password2}  
                            onChange={(e) => setPassword2(e.target.value)}  
                            className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-800 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"  
                            required  
                        />  
                    </div>  
                    <button  
                        type="submit"  
                        disabled={isLoading}  
                        className={`bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'} text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-300 w-full transition duration-150`}  
                    >  
                        {isLoading ? 'Signing Up...' : 'Sign Up'}  
                    </button>  
                    {message && <p className="mt-4 text-red-500 text-center">{message}</p>}  
                </form>  
            </div>  
        </div>  
    );  
};  

export default SignUp;