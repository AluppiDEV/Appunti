---
## [🔙 Torna all'indice](../index.md)
---

## 🔹 1. Frequenze usate dal Wi-Fi

Il **Wi-Fi** utilizza bande **ISM (Industrial, Scientific and Medical)**, che sono bande **libere**, cioè non richiedono licenze a pagamento.  
Le principali bande usate sono:

- **2.4 GHz** → maggiore copertura, ma più affollata e con minore velocità.
- **5 GHz** → minore copertura, ma velocità superiore e meno interferenze.
- **0.9 GHz** → esiste ma è poco usata, data la bassa velocità e applicazioni limitate.

---

## 🔹 2. Potenza e limiti del Wi-Fi

- Potenza massima consentita: **1 Watt**.
- Serve a **limitare interferenze** e **sovrapposizioni** tra reti vicine.
- Senza limite, le reti si disturberebbero a vicenda.

---

## 🔹 3. Frame Wi-Fi: Struttura

Un **frame** è l’unità di trasmissione a livello Data Link. Contiene:

1. **Preambolo (8 byte)** → sincronizza trasmettitore e ricevitore.
2. **Start Frame Delimiter (SFD)** → segna l’inizio del frame (finisce con `11`).
3. **Indirizzo MAC (48 bit)**
   - Destination Address (6 byte)
   - Source Address (6 byte)
4. **Type/Length (2 byte)**
   - `< 1500` → lunghezza
   - `> 1500` → tipo di protocollo (es. `0x0800` per IPv4)
5. **Dati (0–1500 byte)**
6. **Padding (0–46 byte)** → se i dati sono pochi, si aggiunge riempimento.
7. **Checksum (FCS)** → controllo errori.

---

## 🔹 4. Modalità del Wi-Fi

- **Infrastructure Mode**

  - Dispositivi collegati a un **Access Point (AP)**.
  - AP = centro della rete.
  - Copertura di **grandi aree**.

- **Ad-Hoc Mode**
  - Connessione **diretta tra dispositivi**.
  - Nessun AP.
  - Utile per **piccole reti locali**.

---

## 🔹 5. Handover (o Handoff)

- Passaggio automatico da un AP a un altro.
- Evita interruzioni della connessione in movimento.
- Dispositivo sceglie l’AP con segnale più forte.

---

## 🔹 6. Collisioni e gestione nel Wi-Fi

Le collisioni sono inevitabili → si usa **CSMA/CA (Collision Avoidance)**:

- Ascolto del canale prima di trasmettere.
- Attesa di un **tempo casuale** per ridurre le collisioni.
- Richiesta di **ACK** per conferma di ricezione.

➡ Differenza con Ethernet:

- **CSMA/CD** (Ethernet classico) = rileva collisioni.
- **CSMA/CA** (Wi-Fi) = le previene.

---

## 🔹 7. Ethernet classico vs moderno

- **Ethernet classico (802.3)**

  - Topologia **bus** su cavo coassiale.
  - Trasmissione **broadcast**.
  - Collisions gestite con **CSMA/CD**.

- **Ethernet con switch (moderno)**

  - Topologia **stella**, cavi in rame o fibra.
  - Ogni dispositivo ha porta dedicata.
  - Lo switch usa tabella **MAC → porta**.
  - Collisioni eliminate.
  - Spesso comunicazione **full-duplex**.

- **Bridge vs Switch**
  - **Bridge** → collegava reti con protocolli Data Link diversi, ma poco efficiente.
  - **Switch** → lavora a livello MAC, elimina collisioni ed è lo standard attuale.

---

## 🔹 8. Wi-Fi è connectionless ma…

- Funziona come Ethernet: è **connectionless**.
- Richiede comunque una **fase iniziale di connessione** (handshake con AP).
- Differenza:
  - **Connectionless (es. UDP)** → nessuna garanzia di consegna.
  - **Connessione (es. TCP)** → consegna garantita.

---

## 🔹 9. Bluetooth

Il **Bluetooth** crea **reti personali (WPAN)** dette **Piconet**:

- Struttura: **1 master + max 7 slave**.
- Master = controlla il clock e coordina le comunicazioni.
- Utilizzi: cuffie, tastiere, scambio file a corto raggio.
- Diversi **profili** (audio, file transfer, HID, ecc.).

---

## 🔹 10. Altre definizioni e concetti

- **MAC Address** → indirizzo fisico univoco della scheda di rete.
- **Strato MAC**
  - Accesso al canale condiviso.
  - Indirizzamento fisico.
- **Strato LLC (Logical Link Control)**
  - Controllo errori.
  - Controllo flusso.
  - Multiplexing protocolli di livello superiore.
- **Framing** → delimitazione inizio/fine pacchetti.
- **Allocazione risorse**
  - Statica → fissa (es. IP statico).
  - Dinamica → variabile (es. DHCP).

---

## 📌 Da ricordare assolutamente

- Differenza **CSMA/CD (Ethernet)** vs **CSMA/CA (Wi-Fi)**.
- Struttura di un **frame**.
- Differenza **Infrastructure vs Ad-Hoc**.
- Ruolo dello **switch**.
- Cos’è l’**handover**.
- Funzioni di **MAC e LLC**.
