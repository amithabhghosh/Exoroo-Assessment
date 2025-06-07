import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";

export const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/api/posts?page=${page}&limit=10`);
      const updatedPosts = res.data.posts.map(post => ({ ...post, likes: post.likes || 0 }));
      setPosts((prev) => [...prev, ...updatedPosts]);
      setHasMore(res.data.hasMore);
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const lastPostRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

const handleLike = async (postId, index) => {
  try {
    const res = await axios.put(`http://localhost:5000/api/posts/${postId}/like`);
    const updatedLikes = res.data.likes;

    setPosts((prevPosts) =>
      prevPosts.map((post, i) =>
        i === index ? { ...post, likes: updatedLikes } : post
      )
    );
  } catch (err) {
    console.error("Failed to like post", err);
  }
};


  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <div
            key={post._id}
            ref={index === posts.length - 1 ? lastPostRef : null}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  @{post.username}
                </h3>
              </div>

              <p className="text-gray-700 dark:text-gray-300">{post.text}</p>

              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="mt-3 w-full h-48 object-cover rounded"
                />
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
  onClick={() => handleLike(post._id, index)}
  className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
>
  ❤️ Like {post.likes || 0}
</button>

              
            </div>
          </div>
        ))}
      </div>

      {loading && <div className="text-center mt-6">Loading...</div>}
      {!loading && posts.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No posts available.</p>
      )}
      {!hasMore && (
        <p className="text-center text-gray-400 mt-6">You've reached the end.</p>
      )}
    </div>
  );
};
