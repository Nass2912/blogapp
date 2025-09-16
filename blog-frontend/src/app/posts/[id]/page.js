"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchOnePost } from "@/lib/api";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function PostPage() {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function loadPost() {
      try {
        const data = await fetchOnePost(id);
        setPost(data);
      } catch (error) {
        console.error("Failed to fetch post:", error);
      }
    }
    loadPost();
  }, [id]);

  if (!post)
    return (
      <p className="text-center mt-20 text-gray-500 text-lg">Loading post...</p>
    );

  return (
    <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex cursor-pointer items-center bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-md mb-6 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back
      </button>

      {/* Post content */}
      <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-700 text-base sm:text-lg mb-6">{post.body}</p>

        {/* Post date */}
        <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-500">
          <span>{new Date(post.created_at).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
