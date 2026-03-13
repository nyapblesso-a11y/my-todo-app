'use client'

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { auth, googleProvider, githubProvider } from "@/config/firebase";
import { signInWithPopup, signOut, onAuthStateChanged, User } from "firebase/auth";
import { addTodo, getTodos, deleteTodo, toggleTodo } from "@/lib/api";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user_id: string;
}


export default function page() {
const [user, setUser] = useState<User | null>(null)
const [newTodo, setNewTodo] = useState("")
const [todo, setTodo] = useState<Todo[]>([])

  if (!user)
return (
<div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-center text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-center text-gray-500 mb-8">Sign in to your account</p>
 <div className="flex flex-col gap-4">
          <button
            onClick={() => signInWithPopup(auth, googleProvider)}
            className="flex items-center justify-center gap-3 w-full rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 hover:shadow-md transition duration-300"
          >
            <FcGoogle className="h-5 w-5" />
            Continue with Google
          </button>
          <button
            onClick={() => signInWithPopup(auth, githubProvider)}
            className="flex items-center justify-center gap-3 w-full rounded-lg bg-gray-900 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-black hover:shadow-md transition duration-300"
          >
            <FaGithub className="h-5 w-5" />
            Continue with GitHub
          </button>
        </div>

      </div>
    </div>
  
);
  return (
    <div>


    </div>
  )
}
