"use client";

import { fetchPosts } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    async function loadPosts() {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    }
    loadPosts();
  }, []);

  const handleCreatePost = () => {
    if (user) {
      router.push("/posts/new");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left mb-4 sm:mb-0">
          Welcome to BloggerIt, let your imagination flow!
        </h1>
        <button
          onClick={handleCreatePost}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          + Create Post
        </button>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-600 text-center sm:text-left text-lg">
          No posts yet. Be the first to create one!
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="flex flex-col justify-between p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-gray-700 mb-4 line-clamp-3">{post.body}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center mt-4">
                <p className="text-sm text-gray-500">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
                <Link href={`/posts/${post.id}`}>
                  <button className="cursor-pointer mt-3 sm:mt-0 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition duration-300">
                    Explore More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
