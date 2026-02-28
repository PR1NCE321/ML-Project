import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const About = () => {
    return (
        <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-bold tracking-widest text-sm uppercase">Methodology</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-2 mb-8 tracking-tight">How It Works</h1>

                <div className="prose prose-invert prose-lg text-zinc-400 font-light leading-relaxed">
                    <p>
                        Loan Risk Guard AI utilizes a sophisticated <strong>Logistic Regression</strong> model with balanced class weights to identify potential loan defaults. Traditional models often favor the majority class (non-defaulters), missing critical risk factors.
                    </p>

                    <h3 className="text-white mt-8 mb-4">The Algorithm</h3>
                    <p>
                        Our model ingests 16 unique data points including:
                    </p>
                    <ul className="list-disc pl-6 space-y-2 mb-8">
                        <li>Demographic data (Age, Marital Status)</li>
                        <li>Financial health (Income, Credit Score, DTI Ratio)</li>
                        <li>Loan specifics (Amount, Term, Purpose)</li>
                    </ul>

                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 my-8">
                        <h4 className="text-white font-bold mb-2">Performance Metrics</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <div className="text-3xl font-extrabold text-violet-400">96%</div>
                                <div className="text-sm font-medium mt-1">High-Risk Detection</div>
                            </div>
                            <div>
                                <div className="text-3xl font-extrabold text-emerald-400">89%</div>
                                <div className="text-sm font-medium mt-1">Overall Accuracy</div>
                            </div>
                        </div>
                    </div>

                    <p>
                        By prioritizing recall on the minority class, we ensure that financial institutions are protected against the most dangerous "false negatives"—borrowers who look safe but aren't.
                    </p>

                    <h3 className="text-white mt-16 mb-6">About the Developer</h3>
                    <div className="bg-gradient-to-br from-violet-500/10 to-cyan-500/10 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col md:flex-row items-center md:items-start text-center md:text-left space-y-6 md:space-y-0 md:space-x-8">
                        <div className="w-24 h-24 rounded-full shadow-xl shadow-violet-500/20 shrink-0 border-[2px] border-violet-500/50 relative overflow-hidden group">
                            <img src="/profile-img.jpg" alt="Kakadiya Prince" className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <div className="flex-1 w-full">
                            <h4 className="text-2xl font-bold text-white mb-1">Kakadiya Prince</h4>
                            <p className="text-violet-400 font-medium mb-4">B-Tech CSE | Darshan University</p>
                            <p className="text-zinc-400 text-base leading-relaxed m-0 mb-6 font-light">
                                I am an enthusiastic computer science student bridging the gap between intelligent systems and modern user experiences. With a strong passion for Machine Learning, Java, and full-stack web development, I built this application to demonstrate how sophisticated AI models can be seamlessly integrated into reliable, production-ready web platforms.
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-3">
                                <a href="https://github.com/PR1NCE321/PrinceKakadiya" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-4 py-2 text-sm text-zinc-300 hover:text-white transition-all shadow-sm">
                                    <Github size={16} />
                                    <span>GitHub</span>
                                </a>
                                <a href="https://www.linkedin.com/in/kakadiya-prince-860a7730a/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 border border-[#0A66C2]/30 rounded-lg px-4 py-2 text-sm text-[#70B5F9] hover:text-white transition-all shadow-sm">
                                    <Linkedin size={16} />
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default About;
