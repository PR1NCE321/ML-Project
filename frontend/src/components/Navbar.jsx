import { Link, useLocation } from 'react-router-dom';
import { Activity, Home, Info, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Home', path: '/', icon: <Home size={18} /> },
        { name: 'Predict', path: '/predict', icon: <Activity size={18} /> },
        { name: 'About', path: '/about', icon: <Info size={18} /> },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-black/20 backdrop-blur-xl border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    <Link to="/" className="flex items-center space-x-3 group">
                        <img
                            src="/logo.svg"
                            alt="Logo"
                            className="w-10 h-10 group-hover:drop-shadow-[0_0_15px_rgba(124,58,237,0.5)] transition-all duration-300"
                        />
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent tracking-tight">
                            Loan Risk Guard
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center space-x-2 text-sm font-medium transition-colors ${isActive(item.path)
                                    ? 'text-violet-400'
                                    : 'text-zinc-400 hover:text-white'
                                    }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                                {isActive(item.path) && (
                                    <motion.div
                                        layoutId="navbar-indicator"
                                        className="absolute bottom-0 h-0.5 bg-gradient-to-r from-violet-400 to-cyan-400 shadow-[0_-2px_10px_rgba(124,58,237,0.5)]"
                                        style={{ width: '100%' }}
                                    />
                                )}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button (Placeholder) */}
                    <div className="md:hidden">
                        {/* Simple mobile menu trigger could go here */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
