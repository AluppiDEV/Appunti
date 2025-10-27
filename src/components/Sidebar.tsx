import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FileText, Menu, X } from "lucide-react";

interface SidebarProps {
  docs: { title: string; filename: string }[];
}

export default function Sidebar({ docs }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bottone hamburger per mobile - posizionato in alto a sinistra */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar principale */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-gray-900/95 border-r border-gray-800
          text-gray-200 flex flex-col p-4 backdrop-blur-md shadow-xl
          transition-transform duration-300 ease-in-out z-40
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Header sidebar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documenti
          </h2>
          {/* Bottone chiudi visibile solo su mobile quando aperta */}
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Lista documenti */}
        <nav className="flex flex-col gap-2 overflow-y-auto flex-1">
          {docs.map((doc) => (
            <NavLink
              key={doc.filename}
              to={`/doc/${doc.filename}`}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `text-left px-3 py-2.5 rounded-lg transition-all text-sm font-medium ${
                  isActive
                    ? "bg-blue-600/30 text-blue-300 border border-blue-600/50 shadow-sm"
                    : "hover:bg-gray-800/60 text-gray-300 hover:text-white"
                }`
              }
            >
              {doc.title}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Overlay per mobile - chiude sidebar al click */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-30"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
