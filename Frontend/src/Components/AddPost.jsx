import React, { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
export const AddPost = ({ onPostAdded }) => {
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");
  const [imageBase64, setImageBase64] = useState("");
  const [error, setError] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim().length === 0) {
      setError("Username is required.");
      return;
    }

    if (text.trim().length === 0) {
      setError("Post text is required.");
      return;
    }

    if (text.length > 280) {
      setError("Text cannot exceed 280 characters.");
      return;
    }

    setError("");

    const post = {
      username,
      text,
      image: imageBase64,
    };

    try {
      const res = await axios.post("http://localhost:5000/api/posts", post,{ withCredentials: true });
      console.log("Response:", res);
    if(res.data.success){
        toast.success("Post Successfull")
  setUsername("");
      setText("");
      setImageBase64("");
    }
    
    } catch (err) {
        toast.error("Failed")
          console.error("Error posting:", err); 
      setError("Failed to post. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-20 mb-20 max-w-lg w-full mx-auto bg-white p-4 rounded shadow-md space-y-4 sm:px-6 md:px-8 transition-all"
    >
      {error && (
        <div className="text-red-600 bg-red-100 px-3 py-2 rounded text-sm">
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded text-black bg-white"
      />

      <textarea
        placeholder="What's on your mind?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={300}
        className="w-full p-3 border border-gray-300 rounded resize-none text-black bg-white"
        rows={4}
      />
      <div className="text-right text-sm text-gray-700">
        {text.length}/280
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-700"
      />

      {imageBase64 && (
        <div className="mt-2">
          <img
            src={imageBase64}
            alt="Preview"
            className="max-w-full h-auto rounded border border-gray-300"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Post
      </button>
    </form>
  );
};
