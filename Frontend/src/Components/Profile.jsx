// src/pages/Profile.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/user/me') 
      .then(response => {
        setUser(response.data);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load user data.');
      });
  }, []);

  if (error) return <p className="text-red-600">{error}</p>;
  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center mt-10 space-y-4">
      <img src={user.avatar} alt="Avatar" className="w-32 h-32 rounded-full shadow-md" />
      <h2 className="text-2xl font-semibold">@{user.username}</h2>
    </div>
  );
};

export default Profile;
