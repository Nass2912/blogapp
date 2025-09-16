"use client";

import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { fetchPosts, deletePost } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    loadPosts();
  }, [user]);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const allPosts = await fetchPosts();
      setPosts(allPosts.filter((p) => p.user_id === user.id));
    } catch (err) {
      setError("Failed to load posts.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    const token = localStorage.getItem("token");
    try {
      await deletePost(id, token);
      setPosts(posts.filter((p) => p.id !== id));
    } catch (err) {
      setError("Failed to delete post.");
    }
  };

  if (!user)
    return <p className="text-center mt-10 text-gray-600">Please login to see your dashboard.</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0">Your Dashboard</h1>
        <button
          onClick={() => router.push("/posts/new")}
          className="bg-green-500 text-white px-5 py-2 rounded-md hover:bg-green-600 transition"
        >
          + Create Post
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {loading ? (
        <p className="text-gray-600">Loading posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-600">No posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post.id}
              className="p-4 bg-white rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{post.title}</h3>
                <p className="text-gray-700 mt-1">{post.body}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Created: {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex mt-2 sm:mt-0 space-x-2">
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
