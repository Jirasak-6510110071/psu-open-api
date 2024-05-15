import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import axios from 'axios';

const RedirectPage: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { setStudentData, fetchStudentData } = useAuth();

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const code = query.get('code');
        const client_id = import.meta.env.VITE_CLIENT_ID
        const client_secret = import.meta.env.VITE_CLIENT_SECRET

        if (code) {
            setIsLoading(true);
            const fetchToken = async () => {
                try {
                    const params = new URLSearchParams();
                    params.append('code', code);
                    params.append('client_id', client_id );
                    params.append('client_secret', client_secret);
                    params.append('grant_type', 'authorization_code');

                    const response = await axios.post('/api/application/o/token/', params.toString(), {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                    });

                    const { access_token } = response.data;
                    localStorage.setItem('access_token', access_token);
                    await fetchStudentData();
                    navigate('/home');
                } catch (error) {
                    console.error('Error fetching the access token:', error);
                    setErrorMessage('Failed to fetch access token. Please try again.');
                } finally {
                    setIsLoading(false);
                }
            };

            const timeout = setTimeout(() => {
                setErrorMessage('Request timed out. Please try again.');
            }, 10000); 

            fetchToken();

            return () => clearTimeout(timeout);
        } else {
            console.error('No code found in the URL');
        }
    }, [location, navigate]);

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
                {isLoading ? (
                    <div className="flex items-center justify-center mb-4">
                        <svg
                            className="w-12 h-12 text-indigo-500 animate-spin"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                            />
                        </svg>
                    </div>
                ) : errorMessage ? (
                    <div className="text-red-500 text-center">{errorMessage}</div>
                ) : (
                    <>
                        <div className="flex items-center justify-center mb-4">
                            <svg
                                className="w-12 h-12 text-green-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">Success!</h2>
                        <p className="text-gray-600">You have been redirected successfully.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default RedirectPage;