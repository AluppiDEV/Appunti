#include <windows.h>
#include <tchar.h>
#include <iostream>
using namespace std;

int main()
{
    ShellExecute(NULL, "open", "calc.exe", NULL, NULL, SW_SHOWNORMAL);
    // Esecuzione semplice di un programma
    ShellExecute(NULL, "open", "c:\\temp\\Installazione.pdf", NULL, NULL, SW_SHOWNORMAL);
    // Esecuzione del programma associato ad un file
    ShellExecute(NULL, "open", "C:\\Program Files\\7-Zip\\7z.exe", "e c:\\temp\\Archivio.zip -oC:\\temp",
                 NULL, SW_SHOWNORMAL);
    // Estrazione di un archivio compresso, passando gli opportuni parametri a 7-zip.
    return 0;
}