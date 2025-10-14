import React, { useState, useEffect } from "react";

// Usa import.meta.glob per leggere tutti i file Markdown
const allNotes = import.meta.glob("/public/notes/**/*.md", { as: "url" });

// Funzione ricorsiva per costruire la gerarchia delle cartelle
function buildTree(paths) {
  const tree = {};

  for (const path of paths) {
    // Rimuove "/public/notes/" e spezza per sottocartelle
    const parts = path.replace("/public/notes/", "").split("/");
    let current = tree;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = part.endsWith(".md");

      if (isFile) {
        current[part] = { path };
      } else {
        current[part] = current[part] || {};
        current = current[part];
      }
    }
  }

  return tree;
}

export default function Sidebar({ selected, onSelect }) {
  const [tree, setTree] = useState({});

  useEffect(() => {
    const paths = Object.keys(allNotes);
    setTree(buildTree(paths));
  }, []);

  // Render ricorsivo della struttura
  const renderTree = (node, base = "") => {
    return Object.entries(node).map(([key, value]) => {
      const isFile = key.endsWith(".md");
      if (isFile) {
        return (
          <li key={base + key}>
            <button
              onClick={() => onSelect(value.path.replace("/public", ""))}
              className={`w-full text-left px-3 py-1.5 rounded-md text-sm transition ${
                selected === value.path.replace("/public", "")
                  ? "bg-amber-400 text-gray-900 font-semibold"
                  : "text-gray-300 hover:bg-gray-800 hover:text-amber-400"
              }`}
            >
              {key.replace(".md", "")}
            </button>
          </li>
        );
      } else {
        return (
          <li key={base + key}>
            <details className="mb-1 group">
              <summary className="cursor-pointer text-amber-400 font-semibold hover:underline">
                {key}
              </summary>
              <ul className="ml-4 border-l border-gray-700 pl-3 space-y-1 mt-1">
                {renderTree(value, base + key + "/")}
              </ul>
            </details>
          </li>
        );
      }
    });
  };

  return (
    <aside className="w-72 bg-gray-900 border-r border-gray-800 p-4 overflow-y-auto">
      <h3 className="text-lg font-semibold text-amber-400 mb-4">Appunti</h3>
      <ul className="space-y-1">{renderTree(tree)}</ul>
    </aside>
  );
}
