import PredictionForm from '../components/PredictionForm';

const Predict = () => {
    return (
        <div className="pt-24 pb-12">
            <div className="text-center mb-10">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Financial Assessment</h1>
                <p className="text-slate-400">Fill out the applicant details below to generate a real-time risk report.</p>
            </div>
            <PredictionForm />
        </div>
    );
};

export default Predict;
