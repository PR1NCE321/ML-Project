import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, TrendingUp, Zap } from 'lucide-react';

const Hero = () => {
    return (
        <div className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
            {/* Background Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -z-10" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-md rounded-full px-4 py-1.5 mb-8 border border-white/10">
                        <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        <span className="text-sm font-medium text-cyan-200">AI Model v1.2 Live</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8">
                        Predict Financial Risk <br />
                        <span className="bg-gradient-to-r from-violet-400 shrink-0 via-cyan-400 to-teal-300 bg-clip-text text-transparent">
                            With Precision
                        </span>
                    </h1>

                    <p className="max-w-2xl mx-auto text-lg text-zinc-400 mb-10 leading-relaxed font-light">
                        Leverage our advanced logistic regression algorithms to instantly assess loan eligibility and default probability with 96% detection rate on high-risk profiles.
                    </p>

                    <div className="flex justify-center flex-col sm:flex-row gap-4">
                        <Link to="/predict">
                            <button className="px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-semibold text-lg transition-all shadow-lg shadow-violet-500/25 flex items-center justify-center space-x-2 w-full sm:w-auto">
                                <span>Start Analysis</span>
                                <ArrowRight size={20} />
                            </button>
                        </Link>
                        <Link to="/about">
                            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-xl font-semibold text-lg transition-all border border-white/10 backdrop-blur-md w-full sm:w-auto">
                                Learn Methodology
                            </button>
                        </Link>
                    </div>
                </motion.div>

                {/* Feature Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 text-left"
                >
                    {[
                        {
                            icon: <Zap className="text-yellow-400" size={32} />,
                            title: "Instant Results",
                            desc: "Get real-time probability scores processed by our optimized backend pipeline."
                        },
                        {
                            icon: <Shield className="text-green-400" size={32} />,
                            title: "RiskGuard Protocol",
                            desc: "Specialized in detecting high-risk outliers that traditional models miss."
                        },
                        {
                            icon: <TrendingUp className="text-purple-400" size={32} />,
                            title: "Data Driven",
                            desc: "Trained on over 200,000 verified financial records for maximum reliability."
                        }
                    ].map((feature, idx) => (
                        <div key={idx} className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                            <p className="text-zinc-400 font-light">{feature.desc}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default Hero;
