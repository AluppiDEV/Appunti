import React from "react";
import { Link } from "react-router-dom";
import rawDocs from "../data/files.json";

type Doc = {
  title: string;
  description: string;
  filename: string;
};

// Il JSON ora è un oggetto con chiavi (argomenti) e array di documenti
type DocsByTopic = Record<string, Doc[]>;

const docsByTopic: DocsByTopic = rawDocs as DocsByTopic;

export default function IndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-10 text-center">
          Esplora i Documenti
        </h1>

        {/* Cicla gli argomenti */}
        {Object.entries(docsByTopic).map(([topic, docs]) => (
          <section key={topic} className="mb-12">
            <h2 className="text-2xl font-semibold text-blue-300 mb-6 border-b border-gray-700 pb-2">
              {topic}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {docs.map((doc) => (
                <Link
                  key={doc.filename}
                  to={`/doc/${doc.filename}`}
                  className="block rounded-2xl border border-gray-800 bg-gray-900/70 hover:bg-gray-800 transition-all p-6 hover:shadow-lg hover:shadow-blue-900/30"
                >
                  <h3 className="text-lg font-semibold text-blue-300 mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {doc.description}
                  </p>
                  <div className="text-blue-400 text-sm font-medium">
                    Apri → {doc.filename}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
