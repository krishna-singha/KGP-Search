'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/redux/hooks';

interface Feedback {
  category: string;
  message: string;
}

export default function FeedbackPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.user);

  const [feedback, setFeedback] = useState<Feedback>({ category: '', message: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!user?.uid) {
      router.push('/');
    }
  }, [user, router]);

  const categories: string[] = ['Search Accuracy', 'Speed', 'UI/UX', 'Suggestions', 'Other'];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    console.log('Feedback submitted:', feedback);

    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFeedback({ category: '', message: '' });
  };

  if (!user?.uid) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg dark:bg-[#1e1e1e]/80 dark:border-[#ffffff33]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 dark:text-white text-center">Give Us Your Feedback</h2>
        
        {submitted ? (
          <p className="text-green-600 dark:text-green-400 text-center">Thank you for your feedback!</p>
        ) : (
          <form onSubmit={handleSubmit} className='text-gray-700 dark:text-gray-200'>
            <label className="block mb-2 text-sm font-medium">Category</label>
            <select
              className="w-full p-2 border rounded-md mb-4 dark:bg-[#212121] dark:border-[#ffffff33] outline-none cursor-pointer focus:ring-2 focus:ring-blue-500"
              value={feedback.category}
              onChange={(e) => setFeedback({ ...feedback, category: e.target.value })}
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            <label className="block mb-2 text-sm font-medium">Your Feedback</label>
            <textarea
              className="w-full p-2 border rounded-md mb-4 dark:bg-[#212121] dark:border-[#ffffff33] outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Write your feedback here..."
              value={feedback.message}
              onChange={(e) => setFeedback({ ...feedback, message: e.target.value })}
              required
            ></textarea>

            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition-all">
              Submit Feedback
            </button>
          </form>
        )}
      </div>
    </div>
  );
}