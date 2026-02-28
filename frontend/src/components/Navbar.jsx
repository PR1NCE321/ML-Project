import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Home, Info, ShieldCheck, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
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
                            Loan Risk Guard AI
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

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 text-zinc-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Nav Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="md:hidden border-t border-white/5 bg-black/60 backdrop-blur-2xl overflow-hidden"
                    >
                        <div className="px-4 py-6 space-y-3">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`flex items-center space-x-3 w-full p-4 rounded-xl text-base font-medium transition-all ${isActive(item.path)
                                            ? 'bg-violet-500/10 text-violet-400 border border-violet-500/20 shadow-inner'
                                            : 'text-zinc-400 hover:text-white hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
