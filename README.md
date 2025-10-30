# Guida al Codice delle Pagine (Documenti)

Questa guida definisce la **struttura** e la **logica** di composizione del codice alfanumerico univoco assegnato a ciascun documento (pagina).

Il codice è una sequenza di **otto caratteri** suddivisa in **tre sezioni**:

| Sezione | Lunghezza | Descrizione |
| :--- | :--- | :--- |
| **Anno** | 2 caratteri | Anno scolastico di riferimento. |
| **Materia** | 2 caratteri | Codice identificativo della disciplina. |
| **Progressivo** | 4 caratteri | Codice numerico progressivo del documento. |

***

## 1. Codice Anno (2 Caratteri)

I primi due caratteri identificano l'**anno di inizio** dell'anno scolastico di riferimento (es. 25/26 sarà **25**, 26/27 sarà **26**).

***

## 2. Codice Materia (2 Caratteri)

I secondi due caratteri identificano la **materia** a cui il documento si riferisce.

| Materia | Codice |
| :--- | :--- |
| **Storia** | **ST** |
| **Letteratura** | **LT** |
| **Sistemi** | **SS** |
| **Tepsit** (Tecnologie e Progettazione di Sistemi Informatici e Telecomunicazioni) | **TP** |

***

## 3. Codice Progressivo (4 Caratteri)

Gli ultimi quattro caratteri rappresentano un **codice progressivo** del documento all'interno della sua materia e anno.

* Inizia da **0001** per il primo documento di una data materia in un dato anno.
* È un numero sequenziale (es. 0001, 0002, 0003, ecc.).

***

### Esempio di Codice Completo

Un codice come **25LT0005** significa:

* **25**: Anno scolastico 2025/2026
* **LT**: Materia Letteratura
* **0005**: Quinto documento progressivo