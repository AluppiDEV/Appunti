import { useParams } from "react-router-dom";
import rawDocs from "../../data/documento.json";
import { Paragraph } from "../..";

type ParagraphType = {
  title: string;
  contents: string[];
};

type Doc = {
  title: string;
  paragraphs: ParagraphType[];
};

const docsByTopic: Doc[] = rawDocs as Doc[];

export default function DocStoria() {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8">
      <h2 className="text-3xl font-bold mb-4 text-white">
        {selectedDoc.title}
      </h2>
      {selectedDoc.paragraphs.map((p) => (
        <Paragraph key={p.title} title={p.title} contents={p.contents} />
      ))}
    </div>
  );
}
