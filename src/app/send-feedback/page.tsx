'use client';

import { useState } from 'react';

interface Feedback {
  category: string;
  message: string;
}

export default function FeedbackPage() {
  const [feedback, setFeedback] = useState<Feedback>({
    category: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState<boolean>(false);

  const categories: string[] = [
    'Search Accuracy',
    'Speed',
    'UI/UX',
    'Suggestions',
    'Other',
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Placeholder for sending data to backend (e.g., Firebase, API, etc.)
    console.log('Feedback submitted:', feedback);
    
    setSubmitted(true);
    setFeedback({ category: '', message: '' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Give Us Your Feedback</h2>
        
        {submitted ? (
          <p className="text-green-600">Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="block mb-2 text-gray-700">Category</label>
            <select
              className="w-full p-2 border rounded-md mb-4"
              value={feedback.category}
              onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <label className="block mb-2 text-gray-700">Your Feedback</label>
            <textarea
              className="w-full p-2 border rounded-md mb-4"
              rows={4}
              placeholder="Write your feedback here..."
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
              required
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700"
            >
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
