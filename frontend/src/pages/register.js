"use client"
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../pages/auth.module.css';
import bcrypt from "bcryptjs";

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [message, setMessage] = useState('');

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  // Email and password validation
  const isEmailValid = email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
  const isPasswordValid = password.length >= 6; // Password should be at least 6 characters

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Retrieve API URL from environment variables
      const apiUrl = process.env.NEXT_PUBLIC_DB_API_URL;
      if (!apiUrl) {
        throw new Error("API URL is not defined. Check your environment variables.");
      }
  
      // Make the POST request to create a new user
      const response = await axios.post(`${apiUrl}/api/users`, {
        username: email,
        passwordHash: hashedPassword,
        email: email,
      });
  
      // Handle successful registration response
      if (response.status === 201) {
        clearInputs();
        setErrorMessage("");
        setMessage("User created successfully");
      }
    } catch (error) {
      // Check if error is a network error
      if (error.message === 'Network Error') {
        setErrorMessage("Network error. Please try again later.");
      } else if (error.response && error.response.status === 409) {
        setErrorMessage("This email is already registered. Please use a different email.");
      } else if (error.response && error.response.data && error.response.data.error) {
        // Display backend error message
        setErrorMessage(error.response.data.error);
      } else {
        // Fallback error message
        setErrorMessage("Registration failed. Please try again.");
      }
      console.error("Error during registration:", error); // Log the error for debugging
      clearInputs();
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Create an Account</h2>
        <p className={styles.subTitle}>Join us and enjoy personalized healthcare support.</p>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}   
        {message && <p className={styles.success}>{message}</p>}

        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          {email && !isEmailValid && <p className={styles.error}>Please enter a valid email.</p>}

          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          {password && password.length < 6 && <p className={styles.error}>Password must be at least 6 characters long.</p>}

          <button 
            type="submit" 
            className={styles.button}
            disabled={!isEmailValid || !isPasswordValid}  // Disable the button if either email or password is invalid
          >
            Register
          </button>
        </form>
        
        <p className={styles.switchText}>
          Already have an account? <Link href="/auth/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
