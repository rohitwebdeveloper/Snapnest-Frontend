// components/HelpAndFeedback.jsx
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import SendIcon from '@mui/icons-material/Send';
import { api } from '../api/apiConfig';

const HelpAndFeedback = () => {
    const [loading, setloading] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        query: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.query) {
            toast.error("Please fill in all fields");
            return;
        }
        try {
            setloading(true)
            const response = await api.post('/user/feedback/send', formData)
            if (response.status === 201) {
                toast.success("Feedback submitted! We'll get back to you soon.");
                setFormData({ name: '', email: '', query: '' });
            }
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Failed to save your feedback and query')
        } finally {
            setloading(false)
        }
    };

    return (
        <main className="w-full min-h-screen flex items-center justify-center bg-blue-50 dark:bg-gray-900 px-4 py-8">
            <div className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl max-w-lg w-full p-8 space-y-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white text-center">Help & Feedback</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
                    We'd love to hear your feedback or help with any issue!
                </p>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-gray-800 dark:text-gray-300 mb-1">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your name"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-800 dark:text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-800 dark:text-gray-300 mb-1">Your Query / Feedback</label>
                        <textarea
                            name="query"
                            value={formData.query}
                            onChange={handleChange}
                            rows="5"
                            className="w-full p-3 rounded-md border border-gray-300 dark:border-gray-700 bg-blue-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Type your message here..."
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 w-full py-3 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-semibold text-lg transition"
                    >
                        <SendIcon /> {loading ? 'wait a moment...' : 'Send Feedback'}
                    </button>
                </form>
            </div>
        </main>
    );
};

export default HelpAndFeedback;
