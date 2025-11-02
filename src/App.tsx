import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar, IndexPage, DocPage, DocStoria, DocLetteratura } from ".";
import rawDocs from "./data/files.json";

// ───────────────────────────────
// Tipi aggiornati per il nuovo JSON
// ───────────────────────────────
type Argument = {
  title: string;
  description: string;
  filename: string;
};

type Chapter = {
  chapter: string;
  arguments: Argument[];
};

type DocsByTopic = Record<string, Chapter[]>;

const docsByTopic: DocsByTopic = rawDocs as DocsByTopic;

export default function App() {

  return (
    <Router>
      <div className="flex h-screen bg-gray-950 text-gray-100">
        {/* Sidebar con tutti gli argomenti */}
        <Sidebar docsByTopic={docsByTopic} />

        {/* Contenuto principale */}
        <main className="flex-1 overflow-y-auto p-6 md:ml-72">
          <Routes>
            {/* Home con lista documenti */}
            <Route path="/" element={<IndexPage docsByTopic={docsByTopic} />} />

            {/* Pagina documento*/}
            <Route path="/:topic/:id" element={<DocPage />} />

            {/* Pagina documento storia*/}
            {/* <Route path="/storia/:id" element={<DocStoria />} /> */}

            {/* Pagina documento letteratura*/}
            {/* <Route path="/letteratura/:id" element={<DocLetteratura />} /> */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
