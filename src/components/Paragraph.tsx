import React from "react";

interface ParagraphProps {
  title: string;
  contents: string[]; // almeno uno obbligatorio
}

export default function Paragraph({ title, contents }: ParagraphProps) {
  if (!contents || contents.length === 0) {
    throw new Error(
      "Devi fornire almeno un contenuto nel componente Paragraph."
    );
  }

  return (
    <section className="w-full max-w-3xl mx-auto my-6 p-6 rounded-2xl border border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 shadow-md backdrop-blur-sm transition-all hover:shadow-lg">
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4 border-b border-gray-200 dark:border-gray-700 pb-2">
        {title}
      </h1>

      <div className="space-y-4">
        {contents.map((paragraph, idx) => (
          <p
            key={idx}
            className="text-gray-800 dark:text-gray-300 leading-relaxed border-l-4 border-blue-500 pl-4 bg-blue-50/30 dark:bg-blue-900/20 rounded-md p-2"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </section>
  );
}
