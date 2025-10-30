import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FileText, Folder, Menu, X, Home, BookOpen } from "lucide-react";

type Argument = {
  title: string;
  filename: string;
};

type Chapter = {
  chapter: string;
  arguments: Argument[];
};

type DocsByTopic = Record<string, Chapter[]>;

interface SidebarProps {
  docsByTopic: DocsByTopic;
}

export default function Sidebar({ docsByTopic }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Bottone hamburger per mobile */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-lg shadow-lg transition-colors"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {/* Sidebar principale */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-gray-900/95 border-r border-gray-800
        text-gray-200 flex flex-col p-4 backdrop-blur-md shadow-xl transition-transform
        duration-300 ease-in-out z-40 md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Header sidebar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-blue-400 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Documenti
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav principale */}
        <nav className="flex flex-col gap-4 overflow-y-auto flex-1 pr-1">
          {/* 🔹 Pulsante Home */}
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-600/30 text-blue-300 border border-blue-600/50 shadow-sm"
                  : "bg-gray-800/40 hover:bg-gray-800/60 text-gray-300 hover:text-white"
              }`
            }
          >
            <Home size={18} className="text-blue-400" />
            Torna alla Home
          </NavLink>

          {/* 🔹 Argomenti e Capitoli */}
          {Object.entries(docsByTopic).map(([topic, chapters]) => (
            <div key={topic} className="bg-gray-800/30 rounded-xl p-3">
              {/* Titolo dell'argomento */}
              <h3 className="flex items-center gap-2 text-blue-400 font-semibold mb-2 border-b border-gray-700 pb-1">
                <Folder size={16} />
                {topic}
              </h3>

              {/* Capitoli */}
              {chapters.map((chapter) => (
                <div key={chapter.chapter} className="mt-3 ml-2">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-1">
                    <BookOpen size={14} className="text-blue-300" />
                    {Number(chapter.chapter)
                      ? `Capitolo ${chapter.chapter}`
                      : chapter.chapter}
                  </div>

                  {/* Documenti del capitolo */}
                  <div className="flex flex-col pl-5 border-l border-gray-700 space-y-1">
                    {chapter.arguments.map((doc) => (
                      <NavLink
                        key={doc.filename}
                        to={`/${topic.toLowerCase()}/${doc.filename}`}
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `block rounded-md px-3 py-1.5 text-sm transition-all ${
                            isActive
                              ? "bg-blue-600/30 text-blue-300 border border-blue-600/50 shadow-sm"
                              : "hover:bg-gray-800/60 text-gray-300 hover:text-white"
                          }`
                        }
                      >
                        {doc.title}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay per mobile */}
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
