import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Editor({ fileName, onClose, user }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
      // Genera ID univoco usando il path completo senza /notes/ e .md
      const id = fileName
        .replace(/^\/notes\//, "")
        .replace(".md", "")
        .replace(/\//g, "_");
      const ref = doc(db, "notes", id);

      try {
        const snap = await getDoc(ref);
        if (snap.exists()) {
          if (mounted) {
            setText(snap.data().content);
            setLoading(false);
          }
          return;
        }
      } catch (error) {
        console.error("Errore caricamento da Firestore:", error);
      }

      // Se non esiste su Firestore, carica il file locale
      try {
        const resp = await fetch(fileName);
        if (resp.ok) {
          const txt = await resp.text();
          if (mounted) {
            setText(txt);
            setLoading(false);
          }
        } else {
          if (mounted) {
            setText("# Errore\nFile non trovato");
            setLoading(false);
          }
        }
      } catch (error) {
        console.error("Errore caricamento file:", error);
        if (mounted) {
          setText("# Errore\nImpossibile caricare il file");
          setLoading(false);
        }
      }
    }
    load();
    return () => (mounted = false);
  }, [fileName]);

  async function save() {
    if (!user) return alert("Devi essere loggato per salvare.");

    const id = fileName
      .replace(/^\/notes\//, "")
      .replace(".md", "")
      .replace(/\//g, "_");
    const ref = doc(db, "notes", id);

    try {
      await setDoc(ref, {
        content: text,
        updatedAt: new Date().toISOString(),
        authorUid: user.uid,
        originalPath: fileName,
      });
      alert("✅ Salvato con successo!");

      if (onSave) onSave(); // <- trigger per ricaricare il Viewer
      onClose();
    } catch (error) {
      console.error("Errore salvataggio:", error);
      alert("❌ Errore nel salvataggio: " + error.message);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg w-11/12 max-w-5xl p-6">
        <div className="flex justify-between mb-4">
          <h3 className="text-xl text-amber-400 font-semibold">
            Modifica: {fileName.split("/").pop().replace(".md", "")}
          </h3>
          <div className="space-x-2">
            <button
              onClick={save}
              disabled={loading}
              className="bg-amber-400 text-gray-900 px-3 py-1 rounded hover:bg-amber-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
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
          disabled={loading}
          className="w-full h-200 p-3 bg-gray-800 text-gray-100 rounded resize-none font-mono text-sm focus:outline-none focus:ring focus:ring-amber-400/50 disabled:opacity-50"
          placeholder={loading ? "Caricamento..." : "Scrivi qui..."}
        />
      </div>
    </div>
  );
}
