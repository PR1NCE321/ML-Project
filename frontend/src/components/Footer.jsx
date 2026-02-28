import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-black/20 backdrop-blur-md border-t border-white/5 py-12 mt-auto relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Brand */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 tracking-tight">Loan Risk Guard AI</h3>
                        <p className="text-zinc-400 text-sm font-light">
                            Advanced Machine Learning assessments for financial safety and loan eligibility.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 tracking-tight">Resources</h3>
                        <ul className="space-y-2 text-zinc-400 text-sm font-light">
                            <li><a href="#" className="hover:text-violet-400 transition-colors">Documentation</a></li>
                            <li><a href="#" className="hover:text-violet-400 transition-colors">API Reference</a></li>
                            <li><a href="#" className="hover:text-violet-400 transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-lg font-bold text-white mb-4 tracking-tight">Connect</h3>
                        <div className="flex space-x-4">
                            <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Github size={20} /></a>
                            <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-zinc-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-white/5 text-center text-zinc-500 font-light text-sm">
                    © {new Date().getFullYear()} Loan Risk Guard AI. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
