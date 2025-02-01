import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
      <div className="relative max-w-md w-full bg-gradient-to-br from-slate-800/30 to-slate-900/50 backdrop-blur-xl rounded-2xl p-8 shadow-2xl shadow-purple-500/20 animate-float">
        <div className="absolute inset-0 rounded-2xl border border-slate-600/30 mix-blend-overlay" />
        
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent">
          Create Account
        </h2>
        
        <form className="space-y-6">
          <div className="group relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-5 py-4 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-600/30 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 outline-none text-slate-100 placeholder-slate-400"
              required
            />
            <div className="absolute inset-0 rounded-xl pointer-events-none border border-slate-500/30 group-hover:border-purple-500/50 transition-all duration-300 mix-blend-overlay" />
          </div>

          <div className="group relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-5 py-4 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-600/30 focus:border-blue-500/60 focus:ring-2 focus:ring-blue-500/20 transition-all duration-300 outline-none text-slate-100 placeholder-slate-400"
              required
            />
            <div className="absolute inset-0 rounded-xl pointer-events-none border border-slate-500/30 group-hover:border-blue-500/50 transition-all duration-300 mix-blend-overlay" />
          </div>

          <div className="group relative">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-5 py-4 bg-slate-800/40 backdrop-blur-sm rounded-xl border border-slate-600/30 focus:border-indigo-500/60 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-300 outline-none text-slate-100 placeholder-slate-400"
              required
            />
            <div className="absolute inset-0 rounded-xl pointer-events-none border border-slate-500/30 group-hover:border-indigo-500/50 transition-all duration-300 mix-blend-overlay" />
          </div>

          {message && (
            <p className="text-purple-300/80 font-medium animate-pulse-fast">
              {message}
            </p>
          )}

          <button className="w-full mt-8 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-500 hover:to-blue-400 text-white font-semibold py-4 rounded-xl transform transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-lg hover:shadow-purple-500/20">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-400 hover:text-purple-300 transition-colors duration-300 underline underline-offset-4 decoration-2 decoration-blue-400/50 hover:decoration-purple-300/50"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;