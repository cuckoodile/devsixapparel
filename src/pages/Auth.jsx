import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Shirt, AlertCircle, CheckCircle2, Star, Sparkles } from 'lucide-react';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    rememberMe: false,
  });

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation (only for signup)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Form submitted:', formData);
      // Add your authentication logic here
      // navigate('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    
    setFormData(prevState => ({
      ...prevState,
      [name]: inputValue
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      rememberMe: false,
    });
  };

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 'weak', color: 'bg-red-500' };
    if (password.length < 10) return { strength: 'medium', color: 'bg-amber-500' };
    return { strength: 'strong', color: 'bg-emerald-500' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 animate-pulse">
          <Shirt className="h-32 w-32 text-green-400 rotate-12" />
        </div>
        <div className="absolute bottom-20 right-20 animate-pulse delay-1000">
          <Shirt className="h-24 w-24 text-green-400 -rotate-12" />
        </div>
        <div className="absolute top-1/2 left-10 animate-pulse delay-500">
          <Star className="h-16 w-16 text-green-400" />
        </div>
        <div className="absolute top-1/3 right-10 animate-pulse delay-700">
          <Sparkles className="h-20 w-20 text-green-400" />
        </div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg ring-4 ring-green-400/20">
            <Shirt className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-green-400 mb-2">
            DevSix Apparel
          </h1>
          <h2 className="text-2xl font-semibold text-white mb-2">
            {isLogin ? 'Welcome Back, Trendsetter!' : 'Join the Fashion Revolution'}
          </h2>
          <p className="text-gray-400 text-sm">
            {isLogin 
              ? 'Sign in to explore exclusive collections' 
              : 'Create your account and discover premium streetwear'
            }
          </p>
          
          {/* Brand Tagline */}
          <div className="mt-4 flex items-center justify-center space-x-2 text-xs text-green-400">
            <Star className="h-4 w-4" />
            <span className="font-medium">Premium • Exclusive • Trendsetting</span>
            <Star className="h-4 w-4" />
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-gradient-to-br from-gray-800/80 to-slate-800/80 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-green-400/20 ring-1 ring-white/10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                <Mail className="h-4 w-4 text-green-400" />
                Email Address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className={`appearance-none rounded-xl block w-full px-4 py-3 bg-gray-900/50 border ${
                    errors.email ? 'border-red-500' : 'border-gray-600'
                  } placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 backdrop-blur-sm`}
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {errors.email && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.email && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-400" />
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete={isLogin ? 'current-password' : 'new-password'}
                  required
                  className={`appearance-none rounded-xl block w-full px-4 py-3 pr-12 bg-gray-900/50 border ${
                    errors.password ? 'border-red-500' : 'border-gray-600'
                  } placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 backdrop-blur-sm`}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-gray-700/50 rounded-r-xl transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-green-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-green-400" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.password}
                </p>
              )}
              
              {/* Password Strength Indicator */}
              {!isLogin && formData.password && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">Password strength:</span>
                    <span className={`capitalize font-medium ${
                      passwordStrength.strength === 'weak' ? 'text-red-400' :
                      passwordStrength.strength === 'medium' ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {passwordStrength.strength}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${passwordStrength.color}`}
                      style={{ 
                        width: passwordStrength.strength === 'weak' ? '33%' : 
                               passwordStrength.strength === 'medium' ? '66%' : '100%' 
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password Field (Signup only) */}
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Lock className="h-4 w-4 text-green-400" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    autoComplete="new-password"
                    required
                    className={`appearance-none rounded-xl block w-full px-4 py-3 pr-12 bg-gray-900/50 border ${
                      errors.confirmPassword ? 'border-red-500' : 
                      formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-emerald-500' : 'border-gray-600'
                    } placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 backdrop-blur-sm`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center space-x-1 pr-3">
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    )}
                    <button
                      type="button"
                      className="hover:bg-gray-700/50 p-1 rounded transition-colors duration-200"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-green-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-green-400" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {/* Remember Me & Forgot Password (Login only) */}
            {isLogin && (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    className="h-4 w-4 bg-gray-900 border-gray-600 text-green-500 focus:ring-green-500 focus:ring-2 rounded transition-all duration-200"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="rememberMe" className="ml-3 block text-sm text-gray-300">
                    Keep me signed in
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-green-400 hover:text-green-300 transition-colors duration-200 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center py-3 px-6 border border-transparent text-sm font-bold rounded-xl text-white bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3"></div>
                  {isLogin ? 'Signing you in...' : 'Creating your account...'}
                </>
              ) : (
                <>
                  <Shirt className="h-5 w-5 mr-2" />
                  {isLogin ? 'Enter the Store' : 'Join DevSix Family'}
                </>
              )}
            </button>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-8 text-center">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gradient-to-r from-gray-800 to-slate-800 text-gray-400">
                  {isLogin ? "New to DevSix?" : "Already part of the family?"}
                </span>
              </div>
            </div>
            <button
              onClick={toggleAuthMode}
              className="mt-4 font-semibold text-green-400 hover:text-green-300 transition-colors duration-200 focus:outline-none focus:underline flex items-center justify-center gap-2 mx-auto"
            >
              <Sparkles className="h-4 w-4" />
              {isLogin ? 'Create your account' : 'Sign in to your account'}
              <Sparkles className="h-4 w-4" />
            </button>
          </div>

          {/* Brand Footer */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our Terms & Privacy Policy
            </p>
            <div className="mt-2 flex items-center justify-center space-x-4 text-xs text-gray-600">
              <span>Premium Quality</span>
              <span>•</span>
              <span>Free Shipping</span>
              <span>•</span>
              <span>30-Day Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}