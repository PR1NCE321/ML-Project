import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const PredictionForm = () => {
    const [formData, setFormData] = useState({
        Age: '',
        Income: '',
        LoanAmount: '',
        CreditScore: '',
        MonthsEmployed: '',
        NumCreditLines: '',
        InterestRate: '',
        LoanTerm: '',
        DTIRatio: '',
        Education: "Bachelor's",
        EmploymentType: 'Full-time',
        MaritalStatus: 'Single',
        HasMortgage: 0,
        HasDependents: 0,
        LoanPurpose: 'Home',
        HasCoSigner: 0,
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            // For checkboxes, use 1/0
            [name]: type === 'checkbox' ? (checked ? 1 : 0) : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        // Convert strings to numbers where necessary
        const payload = {
            ...formData,
            Age: Number(formData.Age),
            Income: Number(formData.Income),
            LoanAmount: Number(formData.LoanAmount),
            CreditScore: Number(formData.CreditScore),
            MonthsEmployed: Number(formData.MonthsEmployed),
            NumCreditLines: Number(formData.NumCreditLines),
            InterestRate: Number(formData.InterestRate),
            LoanTerm: Number(formData.LoanTerm),
            DTIRatio: Number(formData.DTIRatio),
        };

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await axios.post(`${API_URL}/predict`, payload);
            setResult(response.data);
        } catch (err) {
            setError('Error connecting to the server. Please ensure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = "w-full p-3.5 bg-black/20 border border-white/5 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all font-light";
    const labelClasses = "flex items-center text-sm font-medium text-zinc-300 mb-1.5 text-left tracking-wide";
    const selectClasses = "w-full p-3.5 bg-black/20 border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all font-light appearance-none";
    const checkboxContainerClasses = "flex items-center space-x-3 bg-white/5 p-4 rounded-xl border border-white/5 cursor-pointer hover:bg-white/10 transition-colors";

    const InfoIcon = ({ title }) => (
        <span className="text-violet-400 cursor-help ml-2 inline-flex items-center opacity-70 hover:opacity-100 transition-opacity" title={title}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
            </svg>
        </span>
    );

    return (
        <div className="max-w-4xl mx-auto p-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-cyan-400 to-teal-400" />
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Numerical Inputs */}
                        {[
                            { label: 'Age', name: 'Age', min: 18, max: 120, title: 'Age of the applicant in years (18-120)' },
                            { label: 'Annual Income', name: 'Income', min: 0, title: 'Total annual income of the applicant in USD' },
                            { label: 'Loan Amount', name: 'LoanAmount', min: 0, title: 'Total amount requested for the loan' },
                            { label: 'Credit Score', name: 'CreditScore', min: 300, max: 850, title: 'FICO Credit Score (300-850)' },
                            { label: 'Months Employed', name: 'MonthsEmployed', min: 0, title: 'Total duration of current employment in months' },
                            { label: 'Num Credit Lines', name: 'NumCreditLines', min: 0, title: 'Total number of active credit cards, personal loans, and other credit accounts you currently have' },
                            { label: 'Interest Rate (%)', name: 'InterestRate', min: 0, max: 100, title: 'Annual percentage interest rate on the loan (0-100)' },
                            { label: 'Loan Term (Months)', name: 'LoanTerm', min: 1, max: 360, title: 'Duration of the loan in months' },
                            { label: 'DTI Ratio', name: 'DTIRatio', min: 0, title: 'Debt-to-Income Ratio (e.g., 0.35 meaning 35%)' },
                        ].map((field) => (
                            <div key={field.name} title={field.title}>
                                <label className={labelClasses}>
                                    {field.label}
                                    <InfoIcon title={field.title} />
                                </label>
                                <input
                                    type="number"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    required
                                    min={field.min}
                                    max={field.max}
                                    className={inputClasses}
                                    placeholder={`Enter ${field.label}`}
                                    step="any"
                                    title={field.title}
                                />
                            </div>
                        ))}

                        {/* Categorical Dropdowns */}
                        <div title="Highest level of education completed">
                            <label className={labelClasses}>
                                Education
                                <InfoIcon title="Highest level of education completed" />
                            </label>
                            <select name="Education" value={formData.Education} onChange={handleChange} className={selectClasses} title="Highest level of education completed">
                                <option value="Bachelor's">Bachelor's</option>
                                <option value="Master's">Master's</option>
                                <option value="PhD">PhD</option>
                                <option value="High School">High School</option>
                            </select>
                        </div>

                        <div title="Current employment status">
                            <label className={labelClasses}>
                                Employment Type
                                <InfoIcon title="Current employment status" />
                            </label>
                            <select name="EmploymentType" value={formData.EmploymentType} onChange={handleChange} className={selectClasses} title="Current employment status">
                                <option value="Full-time">Full-time</option>
                                <option value="Part-time">Part-time</option>
                                <option value="Self-employed">Self-employed</option>
                                <option value="Unemployed">Unemployed</option>
                            </select>
                        </div>

                        <div title="Current marital status">
                            <label className={labelClasses}>
                                Marital Status
                                <InfoIcon title="Current marital status" />
                            </label>
                            <select name="MaritalStatus" value={formData.MaritalStatus} onChange={handleChange} className={selectClasses} title="Current marital status">
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </div>

                        <div title="Primary intended purpose of the loan">
                            <label className={labelClasses}>
                                Loan Purpose
                                <InfoIcon title="Primary intended purpose of the loan" />
                            </label>
                            <select name="LoanPurpose" value={formData.LoanPurpose} onChange={handleChange} className={selectClasses} title="Primary intended purpose of the loan">
                                <option value="Home">Home</option>
                                <option value="Auto">Auto</option>
                                <option value="Education">Education</option>
                                <option value="Business">Business</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Checkboxes */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        <label className={checkboxContainerClasses} title="Check if applicant currently has an active mortgage">
                            <input
                                type="checkbox"
                                name="HasMortgage"
                                checked={formData.HasMortgage === 1}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-white/10 text-violet-500 focus:ring-violet-500/50 bg-black/20"
                            />
                            <span className="text-zinc-300 flex items-center font-light">
                                Has Mortgage
                                <InfoIcon title="Check if applicant currently has an active mortgage" />
                            </span>
                        </label>

                        <label className={checkboxContainerClasses} title="Check if applicant has financial dependents (e.g., children)">
                            <input
                                type="checkbox"
                                name="HasDependents"
                                checked={formData.HasDependents === 1}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-white/10 text-violet-500 focus:ring-violet-500/50 bg-black/20"
                            />
                            <span className="text-zinc-300 flex items-center font-light">
                                Has Dependents
                                <InfoIcon title="Check if applicant has financial dependents (e.g., children)" />
                            </span>
                        </label>

                        <label className={checkboxContainerClasses} title="Check if a co-signer is included in the loan application">
                            <input
                                type="checkbox"
                                name="HasCoSigner"
                                checked={formData.HasCoSigner === 1}
                                onChange={handleChange}
                                className="w-5 h-5 rounded border-white/10 text-violet-500 focus:ring-violet-500/50 bg-black/20"
                            />
                            <span className="text-zinc-300 flex items-center font-light">
                                Has Co-Signer
                                <InfoIcon title="Check if a co-signer is included in the loan application" />
                            </span>
                        </label>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 mt-8 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white rounded-xl font-bold text-lg shadow-xl shadow-violet-500/20 transition-all ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? 'Analyzing Application...' : 'Predict Loan Default Risk'}
                    </motion.button>
                </form>

                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-200 backdrop-blur-md"
                        >
                            {error}
                        </motion.div>
                    )}

                    {result && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={`mt-8 p-6 rounded-2xl border backdrop-blur-md ${result.prediction === 1 ? 'bg-red-500/10 border-red-500/30' : 'bg-emerald-500/10 border-emerald-500/30'}`}
                        >
                            <h2 className={`text-2xl font-bold mb-2 tracking-tight ${result.prediction === 1 ? 'text-red-400' : 'text-emerald-400'}`}>
                                {result.message}
                            </h2>
                            <div className="flex justify-center items-center space-x-2">
                                <span className="text-zinc-400 font-light">Default Probability:</span>
                                <span className="text-xl font-mono font-medium">
                                    {(result.probability * 100).toFixed(2)}%
                                </span>
                            </div>

                            <div className="mt-5 w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/5">
                                <div
                                    className={`h-full ${result.prediction === 1 ? 'bg-red-500' : 'bg-emerald-500'} transition-all duration-1000 ease-out`}
                                    style={{ width: `${result.probability * 100}%` }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
};

export default PredictionForm;
