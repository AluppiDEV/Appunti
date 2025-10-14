import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Viewer from "./components/Viewer";
import Editor from "./components/Editor";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [selected, setSelected] = useState("rete.md");
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(0); // trigger per ricaricare il Viewer

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return unsubscribe;
  }, []);

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      <Sidebar selected={selected} onSelect={setSelected} />

      <main className="flex-1 overflow-y-auto p-6">
        <Viewer
          fileName={selected}
          onEdit={() => setEditing(true)}
          user={user}
          lastUpdate={lastUpdate} // 👈 passiamo lastUpdate al Viewer
        />

        {editing && (
          <Editor
            fileName={selected}
            onClose={() => setEditing(false)}
            user={user}
            onSave={() => setLastUpdate(Date.now())} // 👈 aggiorniamo lastUpdate dopo il save
          />
        )}
      </main>
    </div>
  );
}
