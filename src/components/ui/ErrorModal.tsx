import React from 'react';

interface ErrorModalProps {
  error: Error | null;
  apiErrorDetails?: string | null;
  onRetry: () => void;
  onGoBack: () => void;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({ error, apiErrorDetails, onRetry, onGoBack }) => (
  <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
      </div>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">Error Generating Resume</h2>
      <p className="text-gray-600 text-center mb-2">
        {error?.message || "An unexpected error occurred while generating your resume."}
      </p>
      {apiErrorDetails && (
        <div className="bg-gray-100 p-3 rounded-md mt-3 mb-6 max-h-40 overflow-y-auto">
          <p className="text-sm text-gray-700 break-words whitespace-pre-wrap">
            {apiErrorDetails}
          </p>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-4">
        <button
          onClick={onRetry}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
        >
          Try Again
        </button>
        <button
          onClick={onGoBack}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    </div>
  </div>
); 