"use client"
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../pages/auth.module.css';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/register', { email, password });
      // Handle successful registration
    } catch (error) {
      setErrorMessage('Registration failed. Try again.');
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Create an Account</h2>
        <p className={styles.subTitle}>Join us and enjoy personalized healthcare support.</p>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form onSubmit={handleRegister}>
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
          <button type="submit" className={styles.button}>Register</button>
        </form>
        <p className={styles.switchText}>
          Already have an account? <Link href="/auth/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
