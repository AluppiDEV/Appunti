import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Viewer({ fileName, onEdit, user, lastUpdate }) {
  const [content, setContent] = useState("Caricamento...");
  const [title, setTitle] = useState("Caricamento...");

  useEffect(() => {
    let mounted = true;

    async function load() {
      let targetFile = fileName;
      let loadedFromDefault = false;

      const id = fileName
        .replace(/^\/notes\//, "")
        .replace(".md", "")
        .replace(/\//g, "_");

      const ref = doc(db, "notes", id);

      try {
        const snap = await getDoc(ref);
        if (snap.exists() && mounted) {
          setContent(snap.data().content);
          setTitle(fileName.split("/").pop().replace(".md", ""));
          return;
        }
      } catch (error) {
        console.error("Errore caricamento da Firestore:", error);
      }

      try {
        let resp = await fetch(fileName);
        let text = await resp.text();

        // 👇 Se il contenuto contiene <html>, vuol dire che è index.html → file mancante
        if (!resp.ok || text.includes("<html")) {
          console.warn("File non trovato, caricamento welcome.md...");
          resp = await fetch("/notes/welcome.md");
          text = await resp.text();
          loadedFromDefault = true;
        }

        if (mounted) {
          setContent(text);
          setTitle(loadedFromDefault ? "Welcome" : fileName.split("/").pop().replace(".md", ""));
        }
      } catch (error) {
        console.error("Errore caricamento file:", error);
        if (mounted) {
          setContent("⚠️ Errore nel caricamento");
          setTitle("Errore");
        }
      }
    }

    load();
    return () => (mounted = false);
  }, [fileName, lastUpdate]);

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-2xl font-semibold text-amber-400 capitalize">
          {title}
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
