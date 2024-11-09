"use client"
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './auth.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
      // Handle successful login
    } catch (error) {
      setErrorMessage('Invalid email or password.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Welcome Back!</h2>
        <p className={styles.subTitle}>Login to continue using our healthcare chatbot.</p>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Login</button>
        </form>
        <p className={styles.switchText}>
          New here? <Link href="/auth/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
