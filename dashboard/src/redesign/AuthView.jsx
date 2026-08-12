import React, { useState } from 'react';
import { Icon } from './primitives.jsx';
import { request } from '../lib/apiToken.js';

export function AuthView({ onLogin, pushToast }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      pushToast?.('error', 'Please enter email and password');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        // Login uses OAuth2PasswordRequestForm (form-data)
        const params = new URLSearchParams();
        params.append('username', email);
        params.append('password', password);
        
        const res = await request('/api/auth/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: params.toString()
        });
        
        if (!res.ok) throw new Error('Invalid email or password');
        const data = await res.json();
        onLogin(data.access_token);
        pushToast?.('success', 'Logged in successfully');
      } else {
        // Register uses JSON
        const res = await request('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        
        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.detail || 'Failed to register');
        }
        const data = await res.json();
        onLogin(data.access_token);
        pushToast?.('success', 'Account created successfully');
      }
    } catch (err) {
      pushToast?.('error', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo-mark"><Icon n="scissors" /></div>
          <h2>{isLogin ? 'Welcome back' : 'Create an account'}</h2>
          <p>{isLogin ? 'Enter your details to access your dashboard' : 'Join today and start creating viral clips'}</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input 
              type="email" 
              className="auth-input"
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              className="auth-input"
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? <span className="spinner" /> : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-footer">
          <span>{isLogin ? "Don't have an account?" : "Already have an account?"}</span>
          <button type="button" className="link-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>
      </div>
    </div>
  );
}
