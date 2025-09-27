import React, { useState } from 'react';
import styles from './Login.module.css';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch ();  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        dispatch(addUser(data.user));
        onLogin(data.user);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch  {
      setError('Network error');
    }
    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className={styles.input}
            autoComplete="email"
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className={styles.input}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;