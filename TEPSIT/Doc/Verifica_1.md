---
[🔙 Torna all'indice](../index.md)
---

# 📌 1. Programma vs Processo

- **Programma** → insieme di istruzioni (statico, come una ricetta).
- **Processo** → programma in esecuzione (dinamico, come il cuoco che prepara).

👉 Il sistema operativo gestisce **processi**, non programmi.  
Ogni processo è rappresentato dal **PCB (Process Control Block)**, che contiene:

- PID (identificatore)
- Memoria assegnata
- Registri e program counter
- File aperti
- Priorità, sicurezza, ecc.

🔹 Il **kernel** controlla i processi (può fermarli, riattivarli, sospenderli).

---

# 📌 2. Monotasking

- Nei primi sistemi → la CPU eseguiva una sola cosa alla volta.
- Problema → CPU velocissima, ma spesso inattiva in attesa di I/O.

💾 **Esempi** → MS-DOS, Apple II, Commodore 64.

💡 **Batch processing** → lavori eseguiti a lotti, uno dopo l’altro.  
💡 **Spooling** → buffer per gestire dispositivi lenti (es. stampante).

---

# 📌 3. Interruzioni

- **Polling** → la CPU chiede sempre ai dispositivi → lento.
- **Interrupt** → i dispositivi avvisano la CPU → efficiente.

➡️ Le interruzioni rendono possibile multitasking ed eventi.

---

# 📌 4. Multiprogrammazione (Multitasking cooperativo)

- Più programmi in memoria → la CPU passa da uno all’altro.
- Non è vero multitasking, ma l’utente lo percepisce.

Richiede: **scheduler**, cambio di contesto, gestione memoria.

### Stati di un processo

- **New** → creato
- **Ready** → pronto, attende la CPU
- **Execute** → in esecuzione
- **Wait/Blocked** → in attesa di I/O
- **Terminate** → concluso

---

# 📌 5. Multitasking preemptive

- Il kernel può interrompere un processo.
- Ogni processo ha un **quantum** (tempo massimo).

✅ **Vantaggi**:

- CPU condivisa tra più utenti
- meno blocchi
- esperienza fluida

🔹 Tutti i moderni OS (Windows, Linux, macOS, Android, iOS) usano questo metodo.

---

# 📌 6. Algoritmi di Scheduling

- **FCFS** → First Come, First Served
- **SJF** → Shortest Job First
- **Round Robin** → ogni processo ha un quantum
- **MLQ** → code multiple con priorità (rischio starvation)
- **SRT** → versione preemptive di SJF
- **MLF** → priorità dinamiche + quantum diversi

---

# 📌 7. Thread

- I processi sono “pesanti”.
- I **thread** sono più leggeri e condividono risorse del processo.

✅ Vantaggi: meno overhead, più velocità, parallelismo.

### Esempio

Processo **browser** → thread per scaricare pagina, immagini, aggiornare schermo.

### Relazioni

- **1:1** → un processo, un thread (MS-DOS)
- **P:1** → più processi, un thread ciascuno (vecchio UNIX)
- **1:T** → un processo, tanti thread (alcune app Java)
- **P:T** → molti processi, ognuno con più thread (Windows, Linux, macOS moderni)

---

# 📌 Riassunto Capitolo 3.5 – La Memoria

## 🏗 Gerarchia

- Piccole → veloci e costose
- Grandi → lente ed economiche  
  ➡️ Uso di più livelli insieme.

---

## 3.5.1 Cache

- CPU più veloce della RAM → serve cache.
- **Cache hit** ✅ → dato trovato.
- **Cache miss** ❌ → CPU va in RAM.

Formula tempo effettivo:

```bash
Te = Tc × h + (Tc + Tr) × (1 − h)
```

- Tc = tempo cache
- Tr = tempo RAM
- h = hit ratio

### Tipi di cache

- Associativa → veloce ma costosa
- Mappa diretta → più semplice
- **Scrittura**:
  - Write-through (sicura, lenta)
  - Write-back (veloce, rischiosa)

➡️ Cache anche per disco, browser, TLB.

---

## 3.5.2 Memoria Centrale

- Gestita da **MMU**.
- Metodi:

### Paginazione

- Memoria divisa in pagine e frame.
- Page table → traduzione logico-fisico.
- ✅ niente frammentazione esterna.
- ⚠️ overhead per PMMU.

### Segmentazione

- Memoria in segmenti (codice, dati, stack).
- Più flessibile ma più complessa.

### Segmentazione paginata

- Mix dei due sistemi.

---

## 3.5.3 Memoria Virtuale

- Parte del disco usata come RAM.
- Tecnica → demand paging.
- **Page fault** → caricamento da disco.
- Rischio → **thrashing** (troppi swap).

💡 Soluzioni: TLB, resident set, partizioni/file di swap.

---

## 3.5.4 Riassunto

- Cache → veloce, piccola
- RAM → media
- Disco (memoria virtuale) → grande, lenta

Gestione multitasking:

- Paginazione → blocchi fissi
- Segmentazione → blocchi variabili
- Segmentazione paginata → combinazione

---

# 📌 Gestione logica dei volumi e RAID

## 🔹 Volumi logici

- Partizioni rigide → difficile cambiarle.
- Con LVM/JBOD → più partizioni unite in uno spazio unico.

✅ Espandibile, gestibile come un solo disco.

---

## 🔹 RAID

- Più dischi come uno solo.
- Può essere software o hardware.

### Tipi base

- **RAID-0 (Striping)** → veloce, zero sicurezza.
- **RAID-1 (Mirroring)** → dati duplicati, affidabile.
- **RAID-5** → striping + parità → compromesso tra velocità e sicurezza.

---

# 📌 Capitolo 1.1.1 – Processi: competizione e cooperazione

- **Processo** = programma in esecuzione.
- Info nel PCB: memoria, file, priorità, registri.

---

## 🔹 Processi indipendenti vs interagenti

- Indipendenti → risultato deterministico.
- Interagenti → influenzano altri processi.

Due forme:

- **Competizione** → risorse contese
- **Cooperazione** → collaborazione tra processi

---

## 🔹 Concorrenza vs Parallelismo

- **Concorrenza** → processi si alternano sulla stessa CPU.
- **Parallelismo** → processi su più core contemporaneamente.

---

## 🔹 Tassonomia di Flynn

- **SISD** → 1 istruzione, 1 dato (Von Neumann)
- **SIMD** → 1 istruzione, più dati (MMX, PS2)
- **MIMD** → più istruzioni, più dati (multicore moderni)
