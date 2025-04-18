import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, Mail, Lock, BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import axios from 'axios';
import { checkAuth } from '@/services/api';

const API_BASE_URL = 'http://localhost:8000/api';

const Index = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      try {
        const isValid = await checkAuth();
        if (isValid) {
          const response = await axios.get(`${API_BASE_URL}/user/info/`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          });
          
          const { role } = response.data;
          switch(role) {
            case 'STU':
              navigate('/student-dashboard');
              break;
            case 'TEA':
              navigate('/teacher-dashboard');
              break;
            case 'ADM':
              window.location.href = 'http://localhost:8000/admin';
              break;
          }
        }
      } catch (error) {
        console.error('Token validation error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkTokenAndRedirect();
  }, [navigate]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Get JWT token
      const tokenResponse = await axios.post(`${API_BASE_URL}/token/`, {
        email,
        password
      });

      const { access } = tokenResponse.data;
      
      // Store token
      localStorage.setItem('token', access);
      
      // Get user info
      const userResponse = await axios.get(`${API_BASE_URL}/user/info/`, {
        headers: {
          Authorization: `Bearer ${access}`
        }
      });

      const { role } = userResponse.data;
      
      // Redirect based on role
      switch(role) {
        case 'STU':
          navigate('/student-dashboard');
          break;
        case 'TEA':
          navigate('/teacher-dashboard');
          break;
        case 'ADM':
          window.location.href = 'http://localhost:8000/admin';
          return;
        default:
          throw new Error('Invalid user role');
      }
      
      toast.success(`Logged in successfully`);
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  // For demo, login as different user types
  const handleQuickLogin = (type: 'student' | 'teacher' | 'admin') => {
    setEmail(`${type}@example.com`);
    setPassword('password');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-orange"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side (form) */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md space-y-8 animate-fade-in">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-brand-orange flex items-center justify-center">
                <BookOpen className="text-white" size={32} />
              </div>
            </div>
            <h1 className="text-3xl font-kollektif text-foreground mb-1">Easy Exam Academy</h1>
            <p className="text-muted-foreground">Empowering young minds, inspiring futures!</p>
          </div>
          
          <div className="glass-card p-8">
            <h2 className="text-2xl font-kollektif mb-6">Welcome Back</h2>
            
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-brand-orange hover:underline">Forgot Password?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-orange hover:bg-brand-orange/90 animated-btn"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </div>
          
          <div className="text-center text-sm">
            <p className="text-muted-foreground">
              Don't have an account? <a href="#" className="text-brand-orange hover:underline">Sign Up</a>
            </p>
          </div>
          
          {/* Demo Quick Login */}
          <div className="bg-white/50 rounded-lg p-4 border border-border/50">
            <p className="text-xs text-center mb-3 text-muted-foreground">Quick Login for Demo</p>
            <div className="flex gap-2 justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickLogin('student')}
                className="text-xs"
              >
                Student
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickLogin('teacher')}
                className="text-xs"
              >
                Teacher
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => handleQuickLogin('admin')}
                className="text-xs"
              >
                Admin
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side (image/illustration) */}
      <div className="hidden lg:flex flex-1 bg-brand-cream relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative z-10 text-center max-w-md">
            <h2 className="text-4xl font-kollektif mb-4 text-brand-orange animate-float">Attendance System</h2>
            <p className="text-lg text-foreground/80">
              Streamlined attendance tracking for students and teachers. Access records, manage payments, and view analytics.
            </p>
          </div>
        </div>
        
        {/* Abstract shapes */}
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-brand-orange/10 animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-brand-orange/15 animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/4 right-10 w-40 h-40 rounded-full bg-brand-orange/20 animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Index;
