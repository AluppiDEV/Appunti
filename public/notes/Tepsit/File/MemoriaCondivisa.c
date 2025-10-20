#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>

#define SHM_SIZE 1024 /* La memoria condivisa è di 1Kb*/

int main(int argc, char *argv[])
{
    key_t key = 42;
    int shmid;
    char *data;
    int mode;

    /*  creare il segmento */
    if ((shmid = shmget(key, SHM_SIZE, 0644 | IPC_CREAT)) == -1)
    {
        perror("shmget");
        exit(1);
    }

    /* aggancarsi al segmento per ottenerne il puntatore*/
    data = shmat(shmid, (void *)0, 0);
    if (data == (char *)(-1))
    {
        perror("shmat");
        exit(1);
    }

    /* Usare la memoria condivisa*/
    strcpy(data, "Nuovo dato");
    /* sganciare il segment: */
    if (shmdt(data) == -1)
    {
        perror("shmdt");
        exit(1);
    }

    return 0;
}