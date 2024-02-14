import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import login from './api/login';
import signup from './api/signup';

interface AuthenticationProps {
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

// Define your component
const Authentication: React.FC<AuthenticationProps> = ({ setLogIn }) => {
  // Define your state hooks
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem('user');
    if (username) {
      setLogIn(true);
    } else {
      setVisible(true);
    }
  }, []);

  const [signupFormData, setSignupFormData] = useState({
    username: '',
    name: '',
    password: '',
    role: 'User',
  });

  const [loginFormData, setLoginFormData] = useState({
    username: '',
    password: '',
  });

  // Define your change handlers
  const handleSignupChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const handleSignupChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSignupFormData({ ...signupFormData, [name]: value });
  };

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({ ...loginFormData, [name]: value });
  };

  // Define your form submission handlers
  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your signup form submission logic here
    console.log('Signup Form submitted:', signupFormData);

    // Call the async function to make the signup request
    await signup(signupFormData);

    setSignupFormData({ username: '', name: '', password: '', role: 'User' });
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Add your login form submission logic here
    console.log('Login Form submitted:', loginFormData);

    // Make a POST request to the /login endpoint

    // Call the async function to make the login request

    const key = await login(loginFormData);
    if (key) {
      setLogIn(true);
      localStorage.setItem('user', JSON.stringify(key));
    }

    console.log(key);
  };

  // Return your JSX
  return (
    <div className={`bg-white ${visible ? '' : 'hidden'}`}>
      {/* Signup Form */}
      <form onSubmit={handleSignupSubmit}>
        {/* Input fields for signup */}
        {/* Username */}
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          className=" outline"
          value={signupFormData.username}
          onChange={handleSignupChange}
        />
        {/* name */}
        <label htmlFor="name">Name:</label>
        <input
          className=" outline"
          type="name"
          id="name"
          name="name"
          value={signupFormData.name}
          onChange={handleSignupChange}
        />
        {/* Password */}

        <label htmlFor="password">Password:</label>
        <input
          className=" outline"
          type="password"
          id="password"
          name="password"
          value={signupFormData.password}
          onChange={handleSignupChange}
        />

        <label htmlFor="role">Role:</label>
        <select
          id="role"
          name="role"
          value={signupFormData.role}
          onChange={handleSignupChangeSelect}
        >
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>

        {/* Submit button */}
        <input className=" outline" type="submit" value="Signup" />
      </form>

      {/* Login Form */}
      <form onSubmit={handleLoginSubmit}>
        {/* Input fields for login */}
        {/* Username */}
        <label htmlFor="loginUsername">Username:</label>
        <input
          className=" outline"
          type="text"
          id="loginUsername"
          name="username"
          value={loginFormData.username}
          onChange={handleLoginChange}
        />
        {/* Password */}
        <label htmlFor="loginPassword">Password:</label>
        <input
          className=" outline"
          type="password"
          id="loginPassword"
          name="password"
          value={loginFormData.password}
          onChange={handleLoginChange}
        />
        {/* Submit button */}
        <input className=" outline" type="submit" value="Login" />
      </form>
    </div>
  );
};

// Export your component
export default Authentication;
