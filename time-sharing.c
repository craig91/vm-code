#include<stdio.h>
#include<unistd.h>


void child(pid_t p) {
	int i;
	for (i = 0; i < 500000; i++) {
		printf("I am child with pid %d, %d\n", p, i);
	}
}

void parent(pid_t p) {
	int i;
	for (i = 0; i < 500000; i++) {
		printf("I am parent with pid %d, %d\n", p, i);
	}
}

int main() {
	pid_t pid = fork();

	if (pid < 0)
		printf("Fork Failed");
	else if (pid == 0)
		child(pid);
	else
		parent(pid);
	return 0;
}
