import React from "react";
import { Link } from "react-router-dom";

const docs = [
  {
    title: "Rete e Connessioni",
    description: "Documentazione sulla rete e configurazioni di base.",
    filename: "rete",
  },
  {
    title: "Guida di Sistema",
    description: "Informazioni generali sull’uso dell’applicazione e setup.",
    filename: "guida",
  },
  {
    title: "API Reference",
    description: "Elenco e descrizione delle principali API disponibili.",
    filename: "api",
  },
];

export default function IndexPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-8 text-center">
          Esplora i Documenti
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <Link
              key={doc.filename}
              to={`/doc/${doc.filename}`}
              className="block rounded-2xl border border-gray-800 bg-gray-900/70 hover:bg-gray-800 transition-all p-6 hover:shadow-lg hover:shadow-blue-900/30"
            >
              <h2 className="text-xl font-semibold text-blue-300 mb-2">
                {doc.title}
              </h2>
              <p className="text-gray-400 text-sm mb-4">{doc.description}</p>
              <div className="text-blue-400 text-sm font-medium">
                Apri → {doc.filename}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
