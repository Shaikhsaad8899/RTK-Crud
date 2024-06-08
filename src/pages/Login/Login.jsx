import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUsername } from '../../Redux/slices/usernameSlice'; // Import your action creator for setting the username

const Login = () => {
  const [localUsername, setLocalUsername] = useState('sadler'); // Default value for username
  const [password, setPassword] = useState('123'); // Default value for password
  const [error, setError] = useState('');
  const dispatch = useDispatch(); // Get dispatch function
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  let navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4001/api/login', {
        username: localUsername,
        password
      });
      if (response && response.data) {
        const token = response.data.token;
        const username = response.data.username;
        localStorage.setItem('token', token);
        localStorage.setItem('username', username);
        setIsLoggedIn(true);
        dispatch(setUsername(username));
        console.log('Login successful. Token:', token);
        console.log('Login successful. Username:', username);
        navigate("/");
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        console.error('Login failed:', err.response.data.error);
        setError(err.response.data.error);
      } else {
        console.error('Login failed:', err.message);
        setError('An unexpected error occurred');
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div class="container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
      <div class="row">
        <div class="col-md-12">
          {isLoggedIn ? (
            <div class="card">
              <div class="card-body">
                <h2 class="card-title">Welcome, you are logged in!</h2>
                <button class="btn btn-danger" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : (
            <div class="card">
              <div class="card-body">
                <h2 class="card-title text-center">Login</h2>
                {error && <div class="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div class="form-group">
                    <label for="username">Username:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      value={localUsername}
                      onChange={(e) => setLocalUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div class="form-group">
                    <label for="password">Password:</label>
                    <input
                      type="password"
                      class="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" class="mt-3 btn btn-primary">Login</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>


  );
};

export default Login;
