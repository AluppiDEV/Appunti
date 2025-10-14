import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Editor({ fileName, onClose, user }) {
  const [text, setText] = useState("");

  useEffect(() => {
    let mounted = true;
    async function load() {
      const id = fileName.replace(".md", "");
      const ref = doc(db, "notes", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        if (mounted) setText(snap.data().content);
        return;
      }
      const resp = await fetch(`/notes/${fileName}`);
      const txt = await resp.text();
      if (mounted) setText(txt);
    }
    load();
    return () => (mounted = false);
  }, [fileName]);

  async function save() {
    if (!user) return alert("Devi essere loggato per salvare.");
    const id = fileName.replace(".md", "");
    const ref = doc(db, "notes", id);
    await setDoc(ref, {
      content: text,
      updatedAt: new Date().toISOString(),
      authorUid: user.uid,
    });
    alert("Salvato!");
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg w-11/12 max-w-3xl p-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl text-amber-400 font-semibold">
            Modifica: {fileName.replace(".md", "")}
          </h3>
          <div className="space-x-2">
            <button
              onClick={save}
              className="bg-amber-400 text-gray-900 px-3 py-1 rounded hover:bg-amber-300 font-medium"
            >
              Salva
            </button>
            <button
              onClick={onClose}
              className="bg-gray-700 px-3 py-1 rounded hover:bg-gray-600 font-medium"
            >
              Chiudi
            </button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-80 p-3 bg-gray-800 text-gray-100 rounded resize-none font-mono text-sm focus:outline-none focus:ring focus:ring-amber-400/50"
        />
      </div>
    </div>
  );
}
