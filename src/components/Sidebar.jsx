import React, { useState, useEffect } from "react";
import Login from "./Login";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ChevronRight, Folder, FolderOpen, FileText } from "lucide-react";

// OPZIONE 1: Vite - import.meta.glob
const allNotes = import.meta.glob("/public/notes/**/*.md", { as: "url" });

// 🔧 Costruisce la struttura gerarchica delle cartelle
function buildTree(paths) {
  const tree = {};
  for (const path of paths) {
    if (!path.startsWith("/notes/")) continue;
    const parts = path.replace(/^\/notes\//, "").split("/");
    if (parts.length === 1 && parts[0].endsWith(".md")) continue;

    let current = tree;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      const isFile = part.endsWith(".md");
      if (isFile) {
        current[part] = { path, type: "file" };
      } else {
        if (!current[part]) {
          current[part] = { type: "folder", children: {} };
        }
        current = current[part].children || current[part];
      }
    }
  }
  return tree;
}

// 🔹 File singolo
function FileItem({ name, path, selected, onSelect, closeSidebar }) {
  const isSelected = selected === path;

  return (
    <button
      onClick={() => {
        onSelect(path);
        if (closeSidebar) closeSidebar(false); // 👈 chiude menu mobile
      }}
      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-all duration-200 group ${
        isSelected
          ? "bg-amber-400 text-gray-900 font-semibold shadow-lg shadow-amber-400/20"
          : "text-gray-300 hover:bg-gray-800 hover:text-amber-400 hover:translate-x-1"
      }`}
    >
      <FileText
        className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${
          isSelected ? "" : "group-hover:scale-110"
        }`}
      />
      <span className="truncate">{name.replace(".md", "")}</span>
    </button>
  );
}

// 🔹 Cartella con toggle
function FolderItem({
  name,
  children,
  selected,
  onSelect,
  level = 0,
  closeSidebar,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleFolder = () => setIsOpen(!isOpen);

  return (
    <div className="space-y-1">
      <button
        onClick={toggleFolder}
        className="w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-amber-400 hover:bg-gray-800 transition-all duration-200 group"
      >
        <div className="flex items-center gap-2 flex-1">
          {isOpen ? (
            <FolderOpen className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
          ) : (
            <Folder className="w-4 h-4 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
          )}
          <span className="truncate">{name}</span>
        </div>
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-90" : ""
          }`}
        >
          <ChevronRight className="w-4 h-4" />
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="ml-4 pl-3 border-l-2 border-gray-700/50 space-y-1 mt-1">
          {renderTreeRecursive(
            children,
            selected,
            onSelect,
            level + 1,
            isOpen,
            closeSidebar
          )}
        </div>
      </div>
    </div>
  );
}

// 🔁 Ricorsione struttura cartelle
function renderTreeRecursive(
  node,
  selected,
  onSelect,
  level = 0,
  parentOpen = true,
  closeSidebar
) {
  return Object.entries(node).map(([key, value]) => {
    if (value.type === "file") {
      return (
        <FileItem
          key={value.path}
          name={key}
          path={value.path}
          selected={selected}
          onSelect={onSelect}
          closeSidebar={closeSidebar}
        />
      );
    } else {
      return (
        <FolderItem
          key={key}
          name={key}
          children={value.children || value}
          selected={selected}
          onSelect={onSelect}
          level={level}
          closeSidebar={closeSidebar}
        />
      );
    }
  });
}

// 🌟 Componente principale
export default function Sidebar({ selected, onSelect }) {
  const [tree, setTree] = useState({});
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // 👈 controllo apertura mobile

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return unsubscribe;
  }, []);

  useEffect(() => {
    async function loadNotes() {
      const paths = Object.keys(allNotes).map((path) =>
        path.replace("/public", "")
      );
      setTree(buildTree(paths));
      setLoading(false);
    }
    loadNotes();
  }, []);

  return (
    <>
      {/* 🔘 Bottone menu mobile */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-amber-400 p-2 rounded-lg shadow-lg border border-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "✕" : "☰"}
      </button>

      {/* 📁 Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-72 bg-gray-900 border-r border-gray-800 p-4 flex flex-col justify-between transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div>
          {/* Header */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-amber-400 mb-1 flex items-center gap-2">
              <Folder className="w-5 h-5" />
              Appunti
            </h3>
            <div className="h-1 w-12 bg-gradient-to-r from-amber-400 to-transparent rounded-full" />
          </div>

          {/* File e Cartelle */}
          {loading ? (
            <div className="flex items-center gap-2 text-gray-400 text-sm animate-pulse">
              <div className="w-4 h-4 border-2 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <span>Caricamento...</span>
            </div>
          ) : (
            <div className="space-y-1 overflow-y-auto max-h-[calc(100vh-200px)]">
              {renderTreeRecursive(
                tree,
                selected,
                onSelect,
                0,
                true,
                setIsOpen
              )}
            </div>
          )}
        </div>

        {/* Footer: login / utente */}
        <div className="mt-4">
          {user ? (
            <div className="flex flex-col gap-2 items-start">
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
      </aside>
    </>
  );
}
