"use client";

import { useState } from "react";

export default function PostForm({ existingPost, onSuccess }) {
  const [title, setTitle] = useState(existingPost?.title || "");
  const [body, setBody] = useState(existingPost?.body || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = "http://localhost:3000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        existingPost ? `${API_URL}/posts/${existingPost.id}` : `${API_URL}/posts`,
        {
          method: existingPost ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ post: { title, body } }),
        }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.errors ? err.errors.join(", ") : "Something went wrong");
      }

      const post = await res.json();
      onSuccess?.(post);
      setTitle("");
      setBody("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-4">
      <h2 className="text-2xl font-semibold">{existingPost ? "Update Post" : "Create Post"}</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded"
      />

      <textarea
        placeholder="Content"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
        className="w-full px-3 py-2 border rounded"
        rows={5}
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Saving..." : existingPost ? "Update Post" : "Create Post"}
      </button>
    </form>
  );
}
