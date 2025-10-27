import React from "react";
import { useParams } from "react-router-dom";
import Paragraph from "../components/Paragraph";

export default function DocPage() {
  const { id } = useParams<{ id: string }>();

  // Qui potresti caricare contenuto reale da file o fetch()
  const contentMap: Record<string, string[]> = {
    rete: [
      "Questo documento descrive la configurazione di rete.",
      "Include informazioni su connessioni, protocolli e impostazioni base.",
    ],
    guida: [
      "La guida di sistema spiega come utilizzare l’interfaccia principale.",
      "Contiene esempi e best practices per l’ambiente di lavoro.",
    ],
    api: [
      "La documentazione API elenca gli endpoint principali.",
      "Ogni endpoint include esempi e risposte tipiche.",
    ],
  };

  const titleMap: Record<string, string> = {
    rete: "Rete e Connessioni",
    guida: "Guida di Sistema",
    api: "API Reference",
  };

  const contents = contentMap[id || ""] || ["Documento non trovato."];
  const title = titleMap[id || ""] || "Documento Sconosciuto";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 p-8">
      <Paragraph title={title} contents={contents} />
    </div>
  );
}
