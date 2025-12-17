import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (user?.role === 'admin') return '/admin';
    if (user?.role === 'affiliate') return '/affiliate';
    return '/'; 
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#160078] to-transparent opacity-40 -z-10" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#7226FF] rounded-full blur-[120px] opacity-20 -z-10" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#F042FF] rounded-full blur-[120px] opacity-20 -z-10" />

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-[#010030]/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-agilax-neon to-agilax-pink flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Agilax <span className="text-agilax-cyan">Versel</span>
              </span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <>
                  <span className="text-gray-300 text-sm">Hello, {user.name}</span>
                  {(user.role === 'admin' || user.role === 'affiliate') && (
                    <Link to={getDashboardLink()} className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-full text-sm text-white transition-colors">
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>
                  )}
                  <button onClick={handleLogout} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <LogOut size={16} />
                  </button>
                </>
              ) : (
                <>
                   <Link to="/login" className="text-gray-300 hover:text-white text-sm font-medium px-3 py-2">Login</Link>
                   <Link to="/signup" className="bg-gradient-to-r from-agilax-neon to-agilax-pink hover:opacity-90 text-white px-5 py-2 rounded-full font-semibold text-sm transition-all shadow-lg shadow-agilax-neon/20">
                     Sign Up
                   </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-[#010030] border-b border-white/10">
            <div className="px-4 pt-4 pb-6 space-y-3">
              {user ? (
                <>
                  <div className="flex items-center gap-3 mb-4 text-white">
                     <div className="w-8 h-8 rounded-full bg-agilax-purple flex items-center justify-center">
                        <User size={16} />
                     </div>
                     <span className="font-medium">{user.name}</span>
                  </div>
                  {(user.role === 'admin' || user.role === 'affiliate') && (
                     <Link to={getDashboardLink()} onClick={() => setIsMenuOpen(false)} className="block w-full text-left text-gray-300 hover:text-white py-2">Dashboard</Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left text-red-400 py-2">Logout</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block w-full text-center text-gray-300 hover:text-white py-2 border border-white/10 rounded-lg">Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block w-full text-center bg-agilax-neon text-white py-2 rounded-lg font-bold">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <main className="flex-grow pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#000020] border-t border-white/10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Agilax Versel</h3>
              <p>Powering creators with premium assets. Earn while you share.</p>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Links</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="hover:text-agilax-cyan">Terms & Conditions</Link></li>
                <li><Link to="/privacy" className="hover:text-agilax-cyan">Privacy Policy</Link></li>
                <li><Link to="/refund" className="hover:text-agilax-cyan">Refund Policy</Link></li>
                <li><Link to="/affiliate" className="hover:text-agilax-cyan">Refer & Earn</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <p className="mb-2">Email: support@agilaxversel.com</p>
              <div className="flex space-x-4 mt-4">
                 {/* Social Icons Placeholder */}
                 <div className="w-8 h-8 rounded bg-white/10 hover:bg-agilax-neon transition-colors cursor-pointer"></div>
                 <div className="w-8 h-8 rounded bg-white/10 hover:bg-agilax-pink transition-colors cursor-pointer"></div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/5 text-center text-xs">
            © {new Date().getFullYear()} Agilax Versel. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};