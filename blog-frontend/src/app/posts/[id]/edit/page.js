"use client";
import PostForm from "@/components/PostForm";
import { useRouter } from "next/navigation";
import { useState, useEffect, use } from "react";

// React 18+ allows using `use()` for Promises in server/client components
export default function EditPostPage({ params }) {
  const router = useRouter();

  // unwrap params safely
  const { id } = use(params); // use() unwraps the Promise if needed

  const [post, setPost] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:3000/posts/${id}`);
        if (!res.ok) throw new Error("Failed to fetch post");
        setPost(await res.json());
      } catch (err) {
        console.error(err);
      }
    };

    fetchPost();
  }, [id]);

  const handleSuccess = () => {
    router.push("/dashboard");
  };

  if (!post) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="py-8 max-w-3xl mx-auto px-4">
      <button
        onClick={() => router.back()}
        className="mb-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        ← Back
      </button>
      <PostForm existingPost={post} onSuccess={handleSuccess} />
    </div>
  );
}
