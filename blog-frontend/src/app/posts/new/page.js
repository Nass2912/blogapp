"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/api";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const token = localStorage.getItem("token");

    if (!title || !body) {
      setError("Title and content are required.");
      return;
    }

    setLoading(true);
    try {
      await createPost({ title, body }, token);
      router.push("/");
    } catch (err) {
      setError(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
      <div className="w-full max-w-3xl">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-700 hover:text-gray-900 mb-6"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Back
        </button>

        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 text-center sm:text-left">
            Create New Post
          </h1>

          {error && (
            <p className="text-red-500 mb-4 border border-red-200 p-3 rounded bg-red-50 text-center sm:text-left">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                placeholder="Enter post title"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Content</label>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none transition"
                rows={6}
                placeholder="Write your post here..."
              />
            </div>

            <div className="flex justify-center sm:justify-start">
              <button
                type="submit"
                disabled={loading}
                className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating..." : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
