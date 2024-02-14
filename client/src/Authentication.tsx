import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import login from './api/login';
import signup from './api/signup';

interface AuthenticationProps {
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const Authentication: React.FC<AuthenticationProps> = ({ setLogIn }) => {
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

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      signupFormData.name == '' ||
      signupFormData.password == '' ||
      signupFormData.username == ''
    ) {
      alert('Sign Up Fields cannot be empty');
      return;
    }
    await signup(signupFormData);
    toggleLogin();

    setSignupFormData({ username: '', name: '', password: '', role: 'User' });
  };

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loginFormData.password == '' || loginFormData.username == '') {
      alert('Log In Fields cannot be empty');
      return;
    }

    const key = await login(loginFormData);
    if (key) {
      setLogIn(true);
      localStorage.setItem('user', JSON.stringify(key));
    } else {
      alert('Invalid Login');
    }

    setLoginFormData({ username: '', password: '' });
  };

  const [showLogin, setShowLogin] = useState(true);
  const [showSignup, setShowSignup] = useState(false);

  const toggleLogin = () => {
    setShowLogin(true);
    setShowSignup(false);
  };

  const toggleSignup = () => {
    setShowLogin(false);
    setShowSignup(true);
  };

  return (
    <div className={`bg-white h-full ${visible ? '' : 'hidden'}`}>
      <div className="max-w-md mx-auto p-8">
        <div className="flex justify-center">
          <button
            onClick={toggleLogin}
            className={`py-2 px-4 mr-2 ${
              showLogin ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            Login
          </button>
          <button
            onClick={toggleSignup}
            className={`py-2 px-4 ${
              showLogin ? 'bg-gray-200 text-gray-800' : 'bg-blue-500 text-white'
            }`}
          >
            Sign Up
          </button>
        </div>

        <form
          onSubmit={handleSignupSubmit}
          className={`mt-4 ${showSignup ? '' : 'hidden'}`}
        >
          <div className="mb-4">
            <label htmlFor="username" className="block mb-1">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder=" Enter Username"
              value={signupFormData.username}
              onChange={handleSignupChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder=" Enter Name"
              value={signupFormData.name}
              onChange={handleSignupChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder=" Enter Password"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={signupFormData.password}
              onChange={handleSignupChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="role" className="block mb-1">
              Role:
            </label>
            <select
              id="role"
              name="role"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={signupFormData.role}
              onChange={handleSignupChangeSelect}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
          >
            Signup
          </button>
        </form>

        <form
          onSubmit={handleLoginSubmit}
          className={`mt-4 ${showLogin ? '' : 'hidden'} `}
        >
          <div className="mb-4">
            <label htmlFor="loginUsername" className="block mb-1">
              Username:
            </label>
            <input
              type="text"
              id="loginUsername"
              name="username"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              placeholder=" Enter Username"
              value={loginFormData.username}
              onChange={handleLoginChange}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="loginPassword" className="block mb-1">
              Password:
            </label>
            <input
              type="password"
              id="loginPassword"
              name="password"
              placeholder=" Enter Password"
              className="border border-gray-300 rounded px-3 py-2 w-full"
              value={loginFormData.password}
              onChange={handleLoginChange}
            />
          </div>

          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Authentication;
