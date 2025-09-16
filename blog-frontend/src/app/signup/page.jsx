"use client";
import { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/lib/api";
import { AuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useContext(AuthContext);

  const handleSignup = async () => {
    setError("");
    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }

    try {
      const data = await signup({ name, email, password });
      if (data.token) {
        login(data.user, data.token); // ✅ update context + localStorage
        router.push("/"); // redirect to home
      } else if (data.errors) {
        setError(data.errors.join(", "));
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleSignup}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Sign Up
        </button>
      </div>

      <p className="mt-4 text-center text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
