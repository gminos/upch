import React, { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function PostCard({ post, onLikeChange }) {
  const [liked, setLiked] = useState(() => {
    if (!post.id) return false;
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    return likedPosts.includes(post.id);
  });

  const handleToggleLike = async () => {
    const newLiked = !liked;
    const newLikes = post.likes + (newLiked ? 1 : -1);

    try {
      const res = await fetch(`${API_URL}/posts/${post.id}/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: Math.max(0, newLikes) }),
      });

      if (res.ok) {
        const updatedPost = await res.json();
        onLikeChange(updatedPost);

        const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
        if (newLiked) {
          likedPosts.push(post.id);
        } else {
          const index = likedPosts.indexOf(post.id);
          if (index !== -1) likedPosts.splice(index, 1);
        }
        localStorage.setItem("likedPosts", JSON.stringify(likedPosts));

        setLiked(newLiked);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  return (
    <div className="backdrop-blur-md bg-[#1e1e1e]/70 border border-white/20 rounded-2xl p-6 shadow-lg transition transform hover:scale-[1.01] hover:shadow-cyan-500/20 max-w-2xl w-full break-words mx-auto">
      <h2 className="text-2xl font-semibold text-cyan-300 mb-3 break-words">
        {post.title}
      </h2>

      {post.categories?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {post.categories.map((cat, index) => (
            <span
              key={`${post.id || "tempPost"}-${cat.id || index}`}
              className="px-2 py-1 text-xs rounded-full bg-cyan-600/20 text-cyan-300 border border-cyan-400/30"
            >
              {cat.name || "Sin nombre"}
            </span>
          ))}
        </div>
      )}

      <p className="text-gray-200 leading-relaxed mb-4 whitespace-pre-wrap break-words">
        {post.content}
      </p>

      <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-3 text-gray-400 text-sm">
        <span>{new Date(post.created).toLocaleString()}</span>

        <div className="flex items-center gap-2">
          <button
            onClick={handleToggleLike}
            className="transition transform hover:scale-110"
            title={liked ? "Quitar me gusta" : "Dar me gusta"}
          >
            {liked ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                <defs>
                  <linearGradient id="igGrad" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#ff5f6d" />
                    <stop offset="50%" stopColor="#ff9966" />
                    <stop offset="100%" stopColor="#ffc371" />
                  </linearGradient>
                </defs>
                <path
                  fill="url(#igGrad)"
                  d="M 16.792 3.904 A 4.989 4.989 0 0 1 21.5 9.122 c 0 3.072 -2.652 4.959 -5.197 7.222 c -2.512 2.243 -3.865 3.469 -4.303 3.752 c -0.477 -0.309 -2.143 -1.823 -4.303 -3.752 C 5.141 14.072 2.5 12.167 2.5 9.122 a 4.989 4.989 0 0 1 4.708 -5.218 a 4.21 4.21 0 0 1 3.675 1.941 c 0.84 1.175 0.98 1.763 1.12 1.763 s 0.278 -0.588 1.11 -1.766 a 4.17 4.17 0 0 1 3.679 -1.938 Z"
                />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28">
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M 16.792 3.904 A 4.989 4.989 0 0 1 21.5 9.122 c 0 3.072 -2.652 4.959 -5.197 7.222 c -2.512 2.243 -3.865 3.469 -4.303 3.752 c -0.477 -0.309 -2.143 -1.823 -4.303 -3.752 C 5.141 14.072 2.5 12.167 2.5 9.122 a 4.989 4.989 0 0 1 4.708 -5.218 a 4.21 4.21 0 0 1 3.675 1.941 c 0.84 1.175 0.98 1.763 1.12 1.763 s 0.278 -0.588 1.11 -1.766 a 4.17 4.17 0 0 1 3.679 -1.938 Z"
                />
              </svg>
            )}
          </button>
          <span className="text-gray-300 font-medium">{post.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
