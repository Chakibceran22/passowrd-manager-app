import React from 'react';
import { AlertTriangle } from 'lucide-react';

const NotFound = () => {
  const goBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-md p-8 rounded-xl shadow-2xl border-2 border-gray-700 bg-gray-800 text-center">
        <div className="flex justify-center mb-6">
          <AlertTriangle className="w-20 h-20 text-purple-400" />
        </div>
        
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        
        <p className="text-gray-300 mb-8">
          The digital secrets you're looking for seem to be encrypted somewhere else.
        </p>

        <div className="space-y-4">
          <button
            onClick={goBack}
            className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-medium transition-colors duration-200"
          >
            Go Back
          </button>
          
          <a
            href="/"
            className="block w-full px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium transition-colors duration-200"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;