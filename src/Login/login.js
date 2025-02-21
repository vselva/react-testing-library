import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Login() {
    // State variables for user input, messages, and message status
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [msgStatus, setMsgStatus] = useState('');

    // Handler for username input changes
    const handleUserChange = (user) => {
        setUser(user);
        setMessage(''); // Clear any existing messages
    }

    // Handler for password input changes
    const handlePasswordChange = (password) => {
        setPassword(password);
        setMessage(''); // Clear any existing messages
    }

    // Handler for form submission
    const handleSubmit = () => {
        // In a real application, never log passwords
        console.log('User:', user);

        // Use strict equality (===) for comparisons
        if (user === 'admin' && password === 'Admin@123') {
            setTimeout(() => {
                setMessage('Login Successful!');
                setMsgStatus('success');
                setUser('');
                setPassword('');
            }, 1000);
        } else {
            setTimeout(() => {
                setMessage('Invalid Credentials!');
                setMsgStatus('danger');
                setUser('');
                setPassword('');
            }, 1000);
        }
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1>Login</h1>
                    <input 
                        className="form-control m-1" 
                        type="text" 
                        id="name" 
                        placeholder="Enter your name" 
                        value={user}
                        onChange={(e) => handleUserChange(e.target.value)}
                    />
                    <input 
                        className="form-control m-1" 
                        type="password" 
                        id="password" 
                        placeholder="Enter your password" 
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                    />

                    <button 
                        onClick={handleSubmit} 
                        className="btn btn-primary"
                    >
                        Submit
                    </button>
                    {message && (
                        <p className={`alert alert-${msgStatus} alert-dismissible fade show mt-1`}>
                            {message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}