import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  async function doLogin(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, pwd);
    } catch (err) {
      alert("Errore login: " + err.message);
    }
  }

  return (
    <form
      onSubmit={doLogin}
      className="bg-gray-900 border border-gray-800 p-4 rounded-md w-full max-w-lg"
    >
      <h3 className="text-amber-400 font-semibold mb-3">Login</h3>
      <div className="flex gap-2 mb-3">
        <input
          className="flex-1 bg-gray-800 text-gray-100 p-2 rounded focus:ring focus:ring-amber-400/50"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="flex-1 bg-gray-800 text-gray-100 p-2 rounded focus:ring focus:ring-amber-400/50"
          placeholder="password"
          type="password"
          value={pwd}
          onChange={(e) => setPwd(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-amber-400 text-gray-900 font-semibold py-2 rounded hover:bg-amber-300 transition"
      >
        Accedi
      </button>
    </form>
  );
}
