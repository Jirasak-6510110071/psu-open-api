import React from 'react';

const Login: React.FC = () => {
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const authUrl = import.meta.env.VITE_AUTH_URL;
  const redirectUri = 'http://localhost:5173/redirect';

  const handleLogin = () => {
    const authorizationUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
    window.location.href = authorizationUrl;
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to PSU Together</h1>
        <button
          onClick={handleLogin}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Login with PSU Open ID
        </button>
      </div>
    </div>
  );
};

export default Login;