import { useParams } from "react-router-dom";
import rawDocs from "../../data/literature.json";
import { Paragraph } from "../..";

type ParagraphType = {
  title: string;
  contents?: string[];
  subsections?: ParagraphType[]; // 👈 aggiunto per gestire i livelli annidati
};

type Doc = {
  title: string;
  paragraphs: ParagraphType[];
};

const docsByTopic: Doc[] = rawDocs as Doc[];

export default function DocLetteratura() {
  const { id } = useParams<{ id: string }>();
  const selectedDoc = docsByTopic.find(
    (doc) => doc.title.toLowerCase() === id?.toLowerCase()
  );

  if (!selectedDoc) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-400">
        Documento non trovato.
      </div>
    );
  }

  // Funzione ricorsiva per gestire paragrafi e sottosezioni
  const renderParagraph = (p: ParagraphType, depth = 0) => (
    <div key={p.title} className={`ml-${depth * 4} mt-6`}>
      <Paragraph title={p.title} contents={p.contents || []} />

      {/* Se ci sono sottosezioni, le renderizza ricorsivamente */}
      {p.subsections && p.subsections.length > 0 && (
        <div className="mt-4 border-gray-700 pl-4 space-y-4">
          {p.subsections.map((sub) => renderParagraph(sub, depth + 1))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8 text-gray-200">
      <h2 className="text-3xl font-bold mb-6 text-white border-b border-gray-700 pb-2">
        {selectedDoc.title}
      </h2>

      {selectedDoc.paragraphs.map((p) => renderParagraph(p))}
    </div>
  );
}
