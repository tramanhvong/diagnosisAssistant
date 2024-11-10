'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from './auth.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const handleLogin = async (e) => {
  //   e.preventDefault();

  //   try {
  //     // Retrieve API URL from environment variables
  //     const apiUrl = process.env.NEXT_PUBLIC_DB_API_URL;
  //     console.log("url" + apiUrl);

  //     if (!apiUrl) {
  //       throw new Error(
  //         "API URL is not defined. Check your environment variables."
  //       );
  //     }

  //     const response = await axios.post(`${apiUrl}/api/auth/login`, {
  //       email: email,
  //       password: password,
  //     });
  //     // Handle successful login
  //     console.log("log in successfully");
  //   } catch (error) {
  //     setErrorMessage("Invalid email or password.");
  //   }
  // };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Welcome Back!</h2>
        <p className={styles.subTitle}>
          Login to continue using our healthcare chatbot.
        </p>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}
        <form>
          <input
            type='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <Link href='/chat'>
            <button type='submit' className={styles.button}>
              Login
            </button>
          </Link>
        </form>
        <p className={styles.switchText}>
          New here? <Link href='/auth/register'>Create an account</Link>
        </p>
      </div>
    </div>
  );
}
