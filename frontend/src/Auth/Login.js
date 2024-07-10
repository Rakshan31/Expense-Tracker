import React, { useState } from 'react';
import { useGlobalContext } from '../Context/GlobalContext';
import './Auth.css';
import { Link  } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useGlobalContext();
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email, password });
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p className="auth-error">{error}</p>}
                <div className="auth-input">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="auth-input">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                <button type="submit" className="auth-button">Login</button>

                <div>Do not have an account ? <Link to={"/signup"} style={{color:"orange",textDecoration:"none"}}>SignUp Now</Link></div>

            </form>
        </div>
    );
};

export default Login;
