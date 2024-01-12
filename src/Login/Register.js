import React, { useState } from 'react';
import './forms.css';
import { auth, db } from './firebase'; // Assuming 'db' is your Firestore instance
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { useAuthValue } from '../component/AuthContext';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setTimeActive } = useAuthValue();

  const validatePassword = () => {
    let isValid = true;
    if (password !== '' && confirmPassword !== '') {
      if (password !== confirmPassword) {
        isValid = false;
        setError('Passwords do not match');
      }
    }
    return isValid;
  };

  const register = (e) => {
    e.preventDefault();
    setError('');
    if (validatePassword()) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const displayName = `${firstName} ${lastName}`;

          updateProfile(user, {
            displayName: displayName
          }).then(() => {
            const userRef = db.collection('users').doc(user.uid);
            userRef.set({
              firstName: firstName,
              lastName: lastName,
              email: email,
              // You can add more user data here if needed
            }).then(() => {
              sendEmailVerification(auth.currentUser)
                .then(() => {
                  setTimeActive(true);
                  navigate('/verify-email');
                })
                .catch((err) => alert(err.message));
            }).catch((err) => alert(err.message));
          }).catch((err) => alert(err.message));
        })
        .catch((err) => setError(err.message));
    }
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
  };

  return (
    <div className='center'>
      <div className='auth'>
        <h1>Register</h1>
        {error && <div className='auth__error'>{error}</div>}
        <form onSubmit={register} name='registration_form'>
          <input
            type='email'
            value={email}
            placeholder="Enter your email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type='password'
            value={password}
            required
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type='password'
            value={confirmPassword}
            required
            placeholder='Confirm password'
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <input
            type='text'
            value={firstName}
            required
            placeholder='Enter your first name'
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type='text'
            value={lastName}
            required
            placeholder='Enter your last name'
            onChange={(e) => setLastName(e.target.value)}
          />

          <button type='submit'>Register</button>
        </form>
        <span>
          Already have an account?
          <Link to='/login'>Login</Link>
        </span>
      </div>
    </div>
  );
}

export default Register;
