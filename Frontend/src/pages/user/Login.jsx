import React, { useEffect, useState } from 'react';
import { useLoginMutation } from '../../redux/features/auth/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/auth/authSlice';
import { FaSpinner } from 'react-icons/fa';
import { FaEye, FaEyeSlash  } from "react-icons/fa";
import { showToast } from '../../utils/toast';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loginUser, { isLoading: loginLoading }] = useLoginMutation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };

    try {
      const response = await loginUser(data).unwrap();
      const { token, user } = response;
      dispatch(setUser({ user }));
      
      showToast.success('Login successful!');
      navigate('/');
    } catch (err) {
      setMessage("Please provide a valid email and password!");
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-purple-500/20 animate-float">
        <div className="absolute inset-0 rounded-2xl border border-slate-600/30 mix-blend-overlay" />
        
        <h2 className="text-4xl font-bold text-center mb-12 bg-white bg-clip-text text-transparent">
          Welcome Back
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="group relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-5 py-4 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-600/30 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none text-slate-100 placeholder-slate-200"
              required
            />
            <div className="absolute inset-0 rounded-xl pointer-events-none border border-slate-500/30 group-hover:border-purple-500/50 transition-all duration-300 mix-blend-overlay" />
          </div>

          <div className="group relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-5 py-4 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-600/30 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none text-slate-100 placeholder-slate-200"
              required
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye className='text-gray-300 text-lg mr-3' /> : <FaEyeSlash className='text-gray-300 text-lg mr-3'  />}
            </div>
            <div className="absolute inset-0 rounded-xl pointer-events-none border border-slate-500/30 group-hover:border-blue-500/50 transition-all duration-300 mix-blend-overlay" />
          </div>

          {message && (
            <p className="text-purple-300/80 font-medium animate-pulse-fast">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loginLoading}
            className="w-full mt-8 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold py-4 rounded-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-purple-500/20 flex items-center justify-center space-x-2"
          >
            {loginLoading ? (
              <FaSpinner className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <span>Login</span>
              </>
            )}
          </button>
        </form>

        <p className="mt-8 text-center text-slate-200 relative z-10">
          New user?{" "}
          <Link
            to="/register"
            className="text-blue-400 hover:text-purple-300 transition-colors duration-300 underline underline-offset-4 decoration-2 decoration-blue-400/50 hover:decoration-purple-300/50"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;