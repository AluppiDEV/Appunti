import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Viewer({ fileName, onEdit, user, lastUpdate }) {
  const [content, setContent] = useState("Caricamento...");

  useEffect(() => {
    let mounted = true;
    async function load() {
      const id = fileName
        .replace(/^\/notes\//, "")
        .replace(".md", "")
        .replace(/\//g, "_");
      const ref = doc(db, "notes", id);

      try {
        const snap = await getDoc(ref);
        if (snap.exists() && mounted) setContent(snap.data().content);
      } catch (error) {
        console.error("Errore caricamento da Firestore:", error);
      }

      try {
        const resp = await fetch(fileName);
        if (resp.ok && mounted) setContent(await resp.text());
        else if (mounted) setContent("⚠️ File non trovato");
      } catch (error) {
        console.error("Errore caricamento file:", error);
        if (mounted) setContent("⚠️ Errore nel caricamento");
      }
    }
    load();
    return () => (mounted = false);
  }, [fileName, lastUpdate]); // ora corretto

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
