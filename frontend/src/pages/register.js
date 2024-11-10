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


  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10); 
  
      // Make the POST request to create a new user
      const response = await axios.post('http://localhost:5000/api/users', {
        username: email, 
        passwordHash: hashedPassword, 
        email: email
      });
  
      // Handle successful registration response
      if (response.status === 201) {
        console.log("User created successfully:", response.data);
        setErrorMessage(""); // Clear any previous error messages
      }
    } catch (error) {
      // Check for email already registered error (status 409)
      if (error.response && error.response.status === 409) {
        setErrorMessage("This email is already registered. Please use a different email.");
      } else if (error.response && error.response.data && error.response.data.error) {
        // Handle other server-side errors
        setErrorMessage(error.response.data.error);
      } else if (error.message) {
        // General error message (e.g., network issue)
        setErrorMessage("An error occurred: " + error.message);
      } else {
        // Fallback error message
        setErrorMessage("Registration failed. Try again.");
      }
      console.error("Error during registration:", error);
    }
  };
  
  

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <h2>Create an Account</h2>
        <p className={styles.subTitle}>Join us and enjoy personalized healthcare support.</p>
        {errorMessage && <p className={styles.error}>{errorMessage}</p>}   {message && <p >{message}</p>}

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
