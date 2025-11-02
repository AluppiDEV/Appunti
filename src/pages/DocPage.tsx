import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import Paragraph from "../components/Paragraph";

import storia from "../data/history.json";
import letteratura from "../data/literature.json";

type ParagraphType = {
	title: string;
	contents?: string[];
	subsections?: ParagraphType[];
};

type Doc = {
	filename: string;
	title: string;
	paragraphs: ParagraphType[];
};

// 🔹 Mappa dei dataset per argomento
const dataByTopic: Record<string, Doc[]> = {
	storia: storia as Doc[],
	letteratura: letteratura as Doc[],
};

export default function DocPage(): React.ReactElement {
	const { id, topic } = useParams<{ id?: string; topic?: string }>();

	// 🔹 Calcolo memoizzato del documento selezionato
	const selectedDoc = useMemo<Doc | undefined>(() => {
		const docs = topic ? dataByTopic[topic] : undefined;
		if (!docs) return undefined;
		return docs.find((doc) => doc.filename.toUpperCase() === id?.toUpperCase());
	}, [topic, id]);

	if (!selectedDoc) {
		return (
			<div className="min-h-screen flex items-center justify-center text-gray-400">
				Documento non trovato.
			</div>
		);
	}

	// 🔹 Funzione ricorsiva per renderizzare paragrafi e sottosezioni
	const renderParagraph = (p: ParagraphType, depth = 0): React.ReactElement => {
		// Tailwind non accetta classi dinamiche arbitrarie come `ml-${n}`
		// quindi meglio usare una mappa fissa di indentazioni
		const marginClasses = ["ml-0", "ml-4", "ml-8", "ml-12", "ml-16"];
		const margin = marginClasses[Math.min(depth, marginClasses.length - 1)];

		return (
			<div key={p.title} className={`mt-6 ${margin}`}>
				<Paragraph title={p.title} contents={p.contents ?? []} />
				{p.subsections?.length ? (
					<div className="mt-4 pl-4 space-y-4">
						{p.subsections.map((sub) => renderParagraph(sub, depth + 1))}
					</div>
				) : null}
			</div>
		);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8 text-gray-200">
			<h2 className="text-3xl font-bold mb-6 text-white border-b border-gray-700 pb-2">
				{selectedDoc.title}
			</h2>
			{selectedDoc.paragraphs.map((p) => renderParagraph(p))}
		</div>
	);
}
