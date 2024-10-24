import React, { useState } from 'react';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ username: '', password: '', email: '' });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateInputs = () => {
    let errors = {};
    if (!formData.username) errors.username = 'Username cannot be blank';
    if (!formData.password) errors.password = 'Password must be 8 characters or longer';
    if (formData.password && formData.password.length < 8) errors.password = 'Password must be 8 characters or longer';
    if (isSignUp && !formData.email) {
      errors.email = 'Email cannot be blank';
    } else if (isSignUp && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateInputs();
    if (Object.keys(errors).length) {
      setErrors(errors);
      return;
    }
    if (!isSignUp) {
      console.log('Logging in:', formData);
      window.location.href = '/main';
    } else {
      console.log('Creating account:', formData);
      setIsSignUp(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-screen ">
      <div className="text-center mb-2">
        <img src="../public/APP-Logo.png" alt="App Logo" className="w-24 h-auto mx-auto mb-2" />
        <h1 className="text-4xl font-bold text-gray-800 mb-2">WellFitGPT</h1>
        <p className="text-lg text-gray-600 italic">"Your best partner in health and fitness."</p>
      </div>  
      <div className="w-full max-w-lg bg-white p-15 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-left text-gray-700 font-semibold mb-2">Username:</label>
            <input type="text" name="username" value={formData.username} onChange={handleInputChange} 
              className="w-full p-4 h-16 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
          </div>
          {isSignUp && (
            <div>
              <label className="block text-left text-gray-700 font-semibold mb-2">Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleInputChange} 
                className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
              {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
            </div>
          )}
          <div>
            <label className="block text-left text-gray-700 font-semibold mb-2">Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} 
              className="w-full p-4 border border-gray-300 rounded focus:outline-none focus:border-blue-500" />
            {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
          </div>
          <div className="flex flex-col space-y-4">
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200">
              {isSignUp ? 'Create Account' : 'Login'}
            </button>
            <button type="button" className="w-full text-blue-600 font-semibold hover:underline" onClick={() => setIsSignUp(!isSignUp)}>
              {isSignUp ? 'Have an account? Login' : 'No account? Join us today!'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
