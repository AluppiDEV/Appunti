Perfetto 👍
ti preparo il file in modo che tu possa **caricarlo direttamente come file progetto in ChatGPT** — così da poterlo visualizzare, modificare e condividere come una guida interna “viva”.

👉 Ti creo quindi un **file markdown documentale (`guida-bootstrap.md`)**, che mantiene tutta la struttura, il codice HTML completo e una formattazione ottimizzata per la lettura nel progetto.
È pronto per essere usato come documento o base per futuri aggiornamenti.

---

### 📘 **guida-bootstrap.md**

````markdown
# 📘 Guida allo Stile — Bootstrap 5 (Tema Scuro)

Questa guida spiega come mantenere uno stile coerente nel progetto **Visualizzatore Appunti** usando le classi di **Bootstrap 5**.

---

## 🎨 Colori e Tema

Il sito utilizza il tema `data-bs-theme="dark"` con palette Bootstrap scura.

### Classi principali

- **Background:** `bg-dark` o `bg-body-tertiary`
- **Testo:** `text-light` o `text-secondary`
- **Accenti:** `text-info`, `text-warning`, `text-success`

```html
<div class="bg-dark text-light p-3 rounded">
  Contenuto su sfondo scuro coerente con il sito
</div>
```
````

---

## 🔘 Pulsanti

Usa i pulsanti Bootstrap per azioni principali e secondarie.
Evita colori casuali: preferisci `btn-primary`, `btn-outline-light`, o `btn-secondary`.

### Esempio

```html
<button class="btn btn-primary">Azione principale</button>
<button class="btn btn-outline-light">Secondaria</button>
```

**Linee guida:**

- `btn-primary`: azione principale (login, salva, invia)
- `btn-outline-light`: azione secondaria
- `btn-secondary`: azioni minori o di navigazione

---

## 📦 Card (contenitori di contenuto)

Le **card** servono per blocchi informativi o anteprime.
Mantieni sfondi coerenti con il tema scuro e testo leggibile.

```html
<div class="card bg-dark border-light">
  <div class="card-header">Titolo</div>
  <div class="card-body">
    <h5 class="card-title">Sottotitolo</h5>
    <p class="card-text">Testo coerente con il tema scuro.</p>
  </div>
</div>
```

---

## 🧱 Layout e Spaziatura

Per disporre gli elementi usa `container`, `row` e `col`.
Per i margini e padding, utilizza le classi Bootstrap:

| Tipo              | Classe | Descrizione             |
| ----------------- | ------ | ----------------------- |
| Margine generale  | `m-3`  | margine su tutti i lati |
| Padding generale  | `p-2`  | padding su tutti i lati |
| Margine superiore | `mt-4` | margine top             |
| Margine inferiore | `mb-2` | margine bottom          |

### Esempio

```html
<div class="row">
  <div class="col-md-6 bg-secondary p-3 text-center">Colonna 1</div>
  <div class="col-md-6 bg-dark p-3 text-center">Colonna 2</div>
</div>
```

---

## 📑 Testo e Titoli

Usa sempre le classi di testo per mantenere leggibilità nel tema scuro:

- `text-light` → testo principale
- `text-muted` → testo secondario
- `fw-bold` → testo evidenziato
- `fst-italic` → testo in corsivo

### Esempio

```html
<h3 class="text-info">Titolo informativo</h3>
<p class="text-light">Testo principale leggibile su sfondo scuro.</p>
<p class="text-muted">Testo secondario o descrizione.</p>
```

---

## 📋 Componenti utili

Usa altri elementi Bootstrap mantenendo coerenza con il tema:

- `.accordion` — per menù a tendina o FAQ
- `.nav` / `.navbar` — per barre di navigazione
- `.alert` — per messaggi informativi
- `.table.table-dark` — per tabelle coerenti

### Esempio

```html
<div class="alert alert-info" role="alert">
  💡 Usa sempre componenti Bootstrap al posto di HTML puro.
</div>
```

---

## ⚙️ Consigli pratici

- ✅ Evita di scrivere CSS personalizzato se esiste già una classe Bootstrap per lo stesso scopo.
- 🎨 Usa il tema scuro come base e verifica sempre la leggibilità del testo.
- 📱 Controlla sempre la resa su mobile con `container-fluid` e `col-*`.
- ✨ Quando aggiungi CSS personalizzato, fallo solo per piccoli dettagli (bordi, ombre, transizioni).

---

## 💡 (Opzionale) Stili Personalizzati Approvati

Per mantenere un look coerente con _Visualizzatore Appunti_, sono consentite solo leggere personalizzazioni:

| Elemento            | Classe custom suggerita       | Descrizione                   |
| ------------------- | ----------------------------- | ----------------------------- |
| Card / Box          | `.rounded-4` + `shadow-lg`    | angoli dolci e ombre leggere  |
| Pulsanti principali | `btn-primary` + `fw-semibold` | più evidenti ma non invadenti |
| Contenitori scuri   | `bg-dark-subtle`              | tono intermedio per sezioni   |

---

## 🔗 Risorse utili

- [Documentazione ufficiale Bootstrap 5](https://getbootstrap.com/docs/5.3/getting-started/introduction/)
- [Palette colori Bootstrap](https://getbootstrap.com/docs/5.3/customize/color/)
- [Utility API Bootstrap](https://getbootstrap.com/docs/5.3/utilities/api/)

---

### 📄 Credits

Guida interna — **Progetto Visualizzatore Appunti**
Bootstrap 5 — Tema Scuro
© 2025

```

---

### ✅ Come usarlo

1. Copia il contenuto qui sopra e salva in un file chiamato:
```

guida-bootstrap.md

```
2. Caricalo nel tuo **progetto ChatGPT (Bin)** come file progetto.
→ ChatGPT lo riconoscerà come documento e potrai:
- aprirlo in “canvas” per modificarlo collaborativamente
- chiederne aggiornamenti o adattamenti automatici
- generare da esso una versione `.html` o `.pdf` quando vuoi

---

Vuoi che lo prepari **direttamente in formato “canvas documento”** così da aggiungerlo subito al progetto (senza copiare manualmente)? Posso farlo con un solo comando.
```
