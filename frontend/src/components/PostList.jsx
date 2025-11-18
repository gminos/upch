import React from "react";
import PostCard from "./PostCard";

function PostList({ posts, onLikeChange }) {
  if (posts.length === 0) {
    return <p className="text-gray-400 text-center">No hay historias aún.</p>;
  }

  return (
    <div className="flex flex-col items-center gap-8 mt-6">
      {posts.map((post, index) => (
        <PostCard
          key={post.id ? `post-${post.id}` : `temp-${index}`}
          post={post}
          onLikeChange={onLikeChange}
        />
      ))}
    </div>
  );
}

export default PostList;
