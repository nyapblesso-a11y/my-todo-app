"use client";

import { useState, useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { auth, googleProvider, githubProvider } from "@/config/firebase";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { addTodo, getTodos, deleteTodo, toggleTodo } from "@/lib/api";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  user_id: string;
}

export default function page() {
  const [user, setUser] = useState<User | null>(null);
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const data = await getTodos();
      setTodos(data);
    } catch (err) {
      console.error("Error:", err);
    }
  };
const handleAddTodo = async () => {
    if (!newTodo || !user) return;
    try {
      const todo = await addTodo(newTodo, user.uid);
      setTodos([...todos, todo]);
      setNewTodo("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggle = async (id: number, completed: boolean) => {
    try {
      const updated = await toggleTodo(id, completed);
      setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const remaining = await deleteTodo(id);
      setTodos(remaining);
    } catch (err) {
      console.error(err);
    }
  }

  if (!user)
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="text-center text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-center text-gray-500 mb-8">
            Sign in to your account
          </p>
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

  return( 
  <>
  <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-4">Hello, {user.displayName}</h1>
      <button
        onClick={() => signOut(auth)}
        className="bg-red-500 text-white px-4 py-2 rounded mb-4"
      >
        Logout
      </button>

      <div className="flex mb-4 gap-2">
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          className="border px-2 py-1 flex-1 rounded"
          placeholder="Add a todo"
        />
        <button
          onClick={handleAddTodo}
          className="bg-green-500 text-white px-4 py-1 rounded"
        >
          Add
        </button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center mb-2 p-2 border rounded ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            <span
              onClick={() => handleToggle(todo.id, todo.completed)}
              className="cursor-pointer"
            >
              {todo.title}
            </span>
            <button
              onClick={() => handleDelete(todo.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  </>
  )
}
