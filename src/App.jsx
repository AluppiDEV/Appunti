import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Sidebar, IndexPage, DocStoria } from "../src";

export default function App() {
  const docs = [
    { title: "Rete e Connessioni", filename: "rete" },
    { title: "Guida di Sistema", filename: "guida" },
    { title: "API Reference", filename: "api" },
  ];

  return (
    <Router>
      <div className="flex h-screen bg-gray-950 text-gray-100">
        <Sidebar docs={docs} />

        <main className="flex-1 overflow-y-auto p-6 md:ml-64">
          <Routes>
            <Route path="/" element={<IndexPage />} />
            <Route path="/storia/:id" element={<DocStoria />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
