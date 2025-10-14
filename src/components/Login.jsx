import React, { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
  const [isFormVisible, setIsFormVisible] = useState(false);
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
    <div className="flex flex-col items-stretch gap-2 w-full">
      {/* Pulsante compatto sempre visibile */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className="bg-amber-400 text-gray-900 font-semibold py-1 px-2 rounded hover:bg-amber-300 transition text-sm"
      >
        {isFormVisible ? "Chiudi Login" : "Mostra Login"}
      </button>

      {/* Form compatto */}
      {isFormVisible && (
        <form
          onSubmit={doLogin}
          className="bg-gray-900 border border-gray-800 p-3 rounded-md flex flex-col gap-2 w-full"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 rounded bg-gray-800 text-gray-100 focus:ring focus:ring-amber-400/50 text-sm"
          />
          <input
            type="password"
            placeholder="Password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className="p-2 rounded bg-gray-800 text-gray-100 focus:ring focus:ring-amber-400/50 text-sm"
          />
          <button
            type="submit"
            className="bg-amber-400 text-gray-900 py-1 px-2 rounded hover:bg-amber-300 transition text-sm"
          >
            Accedi
          </button>
        </form>
      )}
    </div>
  );
}
