import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { Leaf, User, Mail, Lock, Eye, EyeOff, Loader2, ArrowRight } from 'lucide-react';
import { cn } from '../utils/helpers';

const SignupPage: React.FC = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      await signup(data.email, data.password, data.fullName);
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left Side: Visuals */}
      <div className="hidden lg:block relative bg-primary-600 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80')] bg-cover bg-center opacity-40 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/80 via-primary-900/20 to-transparent" />
        
        <div className="relative h-full flex flex-col justify-between p-16">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <div className="p-2 bg-white rounded-lg">
              <Leaf className="text-primary-600 h-6 w-6" />
            </div>
            <span className="font-bold text-2xl font-['Outfit'] text-white">BreedAI</span>
          </Link>

          <div>
            <h2 className="text-5xl font-bold text-white mb-6 leading-tight">
              Join the future of <span className="text-primary-300">dairy farming</span>.
            </h2>
            <p className="text-xl text-primary-100/80 max-w-lg">
              Create an account today and get access to our advanced breed recognition tools and market intelligence.
            </p>
          </div>

          <div className="flex items-center gap-4 text-white/60 text-sm">
            <span>© 2026 BreedAI Platform</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Premium Agriculture Solutions</span>
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex items-center justify-center p-8 bg-white dark:bg-slate-950">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-10">
            <div className="lg:hidden flex justify-center mb-6">
              <Link to="/" className="flex items-center gap-2">
                <Leaf className="text-primary-600 h-8 w-8" />
                <span className="font-bold text-2xl font-['Outfit'] dark:text-white">BreedAI</span>
              </Link>
            </div>
            <h1 className="text-3xl font-bold mb-3 dark:text-white">Create Account</h1>
            <p className="text-slate-500 dark:text-slate-400">Start identifying breeds with precision</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  {...register("fullName", { required: "Full name is required" })}
                  placeholder="John Doe"
                  className={cn(
                    "input-field pl-12",
                    errors.fullName ? "border-red-500 focus:ring-red-500/20" : ""
                  )}
                />
              </div>
              {errors.fullName && <p className="text-xs text-red-500 mt-1 ml-1">{errors.fullName.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  {...register("email", { 
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                  })}
                  placeholder="name@example.com"
                  className={cn(
                    "input-field pl-12",
                    errors.email ? "border-red-500 focus:ring-red-500/20" : ""
                  )}
                />
              </div>
              {errors.email && <p className="text-xs text-red-500 mt-1 ml-1">{errors.email.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  {...register("password", { 
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" }
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={cn(
                    "input-field pl-12 pr-12",
                    errors.password ? "border-red-500 focus:ring-red-500/20" : ""
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1 ml-1">{errors.password.message as string}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                <input
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === password || "Passwords do not match"
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className={cn(
                    "input-field pl-12 pr-12",
                    errors.confirmPassword ? "border-red-500 focus:ring-red-500/20" : ""
                  )}
                />
              </div>
              {errors.confirmPassword && <p className="text-xs text-red-500 mt-1 ml-1">{errors.confirmPassword.message as string}</p>}
            </div>

            <div className="flex items-center gap-2 px-1">
              <input type="checkbox" id="terms" required className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="terms" className="text-xs text-slate-500 dark:text-slate-400">
                I agree to the <a href="#" className="text-primary-600 font-semibold underline underline-offset-2">Terms</a> and <a href="#" className="text-primary-600 font-semibold underline underline-offset-2">Privacy Policy</a>
              </label>
            </div>

            <button
              disabled={isLoading}
              type="submit"
              className="btn-primary w-full py-4 flex items-center justify-center gap-2 group disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Create Account <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>

            <p className="text-center text-sm text-slate-600 dark:text-slate-400 pt-4">
              Already have an account? <Link to="/login" className="text-primary-600 font-bold hover:underline">Login</Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default SignupPage;
