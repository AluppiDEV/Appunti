import React from "react";
import { Link } from "react-router-dom";
import rawDocs from "../data/files.json";

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

interface IndexProps {
  docsByTopic: DocsByTopic;
}

export default function IndexPage({ docsByTopic }: IndexProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-400 mb-10 text-center">
          Esplora i Documenti
        </h1>

        {/* Cicla i vari argomenti principali (es. Storia, Letteratura...) */}
        {Object.entries(docsByTopic).map(([topic, chapters]) => (
          <section key={topic} className="mb-16">
            <h2 className="text-2xl font-semibold text-blue-300 mb-6 border-b border-gray-700 pb-2">
              {topic}
            </h2>

            {/* Cicla i capitoli di ciascun argomento */}
            {chapters.map((chapter) => (
              <div key={chapter.chapter} className="mb-10">
                <h3 className="text-xl font-medium text-blue-200 mb-4">
                  {Number(chapter.chapter)
                    ? `Capitolo ${chapter.chapter}`
                    : chapter.chapter}
                </h3>

                {/* Griglia delle card dei singoli argomenti */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {chapter.arguments.map((arg) => (
                    <Link
                      key={arg.filename}
                      to={`/${topic.toLowerCase()}/${arg.filename}`}
                      className="block rounded-2xl border border-gray-800 bg-gray-900/70 hover:bg-gray-800 transition-all p-6 hover:shadow-lg hover:shadow-blue-900/30"
                    >
                      <h4 className="text-lg font-semibold text-blue-300 mb-2">
                        {arg.title}
                      </h4>
                      <p className="text-gray-400 text-sm mb-4">
                        {arg.description}
                      </p>
                      <div className="text-blue-400 text-sm font-medium">
                        Apri → {arg.filename}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </section>
        ))}
      </div>
    </main>
  );
}
