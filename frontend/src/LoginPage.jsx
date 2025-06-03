import React, { useState, useEffect, useRef } from 'react';
import './LoginPage.css';
import { FaPaw } from 'react-icons/fa';

const LoginPage = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [userType, setUserType] = useState('owner'); // 'owner' or 'doctor'

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const catRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (catRef.current) {
        const cat = catRef.current;
        const catWidth = cat.offsetWidth;
        const catHeight = cat.offsetHeight;
        const x = e.clientX - catWidth / 2;
        const y = e.clientY - catHeight / 2;
        cat.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'signup' && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Handle login/signup logic here
    alert(`${activeTab === 'login' ? 'Logging in' : 'Signing up'} as ${userType} with Email: ${email}`);
    onLogin(userType);
  };

  return (
    <div className="login-container">
      <div className="background-animation">
        <span className="circle circle1"></span>
        <span className="circle circle2"></span>
        <span className="circle circle3"></span>
        <span className="circle circle4"></span>
        <span className="circle circle5"></span>
      </div>
      <div className="cat" ref={catRef}>
        🐱
      </div>
      <div className="login-card">
        <div className="logo-container">
          <FaPaw className="paw-icon" />
          <h2 className="login-title">Online Petcare & Consultation</h2>
        </div>
        <p className="tagline">Caring for your pets, anytime anywhere</p>

        <div className="tab-buttons">
          <button
            className={activeTab === 'login' ? 'active' : ''}
            onClick={() => setActiveTab('login')}
          >
            Login
          </button>
          <button
            className={activeTab === 'signup' ? 'active' : ''}
            onClick={() => setActiveTab('signup')}
          >
            Signup
          </button>
        </div>

        <div className="user-type-toggle">
          <label>
            <input
              type="radio"
              name="userType"
              value="owner"
              checked={userType === 'owner'}
              onChange={() => setUserType('owner')}
            />
            Pet Owner
          </label>
          <label>
            <input
              type="radio"
              name="userType"
              value="doctor"
              checked={userType === 'doctor'}
              onChange={() => setUserType('doctor')}
            />
            Doctor
          </label>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {activeTab === 'signup' && (
            <>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </>
          )}

          <button type="submit" className="login-button">
            {activeTab === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
