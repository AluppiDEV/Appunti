import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Viewer from "./components/Viewer";
import Editor from "./components/Editor";
import Login from "./components/Login";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [selected, setSelected] = useState("rete.md");
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => onAuthStateChanged(auth, (u) => setUser(u)), []);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar selected={selected} onSelect={setSelected} />

      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-4 flex justify-between items-center">
          {user ? (
            <div className="flex gap-4 items-center">
              <p className="text-sm text-gray-300">
                Loggato come{" "}
                <span className="font-semibold text-amber-400">
                  {user.email}
                </span>
              </p>
              <button
                className="px-3 py-1 text-sm bg-red-500 rounded hover:bg-red-600"
                onClick={() => auth.signOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <Login />
          )}
        </div>

        <Viewer
          fileName={selected}
          onEdit={() => setEditing(true)}
          user={user}
        />

        {editing && (
          <Editor
            fileName={selected}
            onClose={() => setEditing(false)}
            user={user}
          />
        )}
      </main>
    </div>
  );
}
