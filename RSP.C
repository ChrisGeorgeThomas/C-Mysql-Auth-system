#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <string.h>

const char* get_result(const char* user, const char* computer) {
    if (strcmp(user, computer) == 0) return "Tie";
    else if ((strcmp(user, "rock") == 0 && strcmp(computer, "scissors") == 0) ||
             (strcmp(user, "paper") == 0 && strcmp(computer, "rock") == 0) ||
             (strcmp(user, "scissors") == 0 && strcmp(computer, "paper") == 0))
        return "You win!";
    else return "You lose!";
}

int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("{\"error\": \"No choice provided\"}\n");
        return 1;
    }

    srand(time(NULL));
    const char *choices[] = {"rock", "paper", "scissors"};
    const char *user_choice = argv[1];
    const char *computer_choice = choices[rand() % 3];
    const char *result = get_result(user_choice, computer_choice);

    printf("{\"user\": \"%s\", \"computer\": \"%s\", \"result\": \"%s\"}\n", user_choice, computer_choice, result);
    return 0;
}
