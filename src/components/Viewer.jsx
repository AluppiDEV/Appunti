import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Viewer({ fileName, onEdit, user }) {
  const [content, setContent] = useState("Caricamento...");

  useEffect(() => {
    let mounted = true;
    async function load() {
      const id = fileName.split("/").pop().replace(".md", "");
      const ref = doc(db, "notes", id);
      const snap = await getDoc(ref);
      if (snap.exists()) {
        if (mounted) setContent(snap.data().content);
        return;
      }
      const resp = await fetch(fileName);
      const text = await resp.text();
      if (mounted) setContent(text);
    }
    load();
    return () => (mounted = false);
  }, [fileName]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold text-amber-400">
          {fileName.split("/").pop().replace(".md", "")}
        </h2>
        {user && (
          <button
            className="bg-amber-400 text-gray-900 px-3 py-1 rounded hover:bg-amber-300 font-medium"
            onClick={onEdit}
          >
            Modifica
          </button>
        )}
      </div>

      <article className="prose prose-invert prose-amber max-w-none">
        <ReactMarkdown>{content}</ReactMarkdown>
      </article>
    </div>
  );
}
