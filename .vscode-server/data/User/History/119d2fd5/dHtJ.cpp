#include <cstdlib>
#include <iostream>
 
int main( ) {
    int x, y;
    std::cout << "Digite dois números: ";
    std::cin >> x >> y;
 
    int soma = x + y;
 
    std::cout << "A soma dos números é: " << soma << std::endl;
 
    return EXIT_SUCCESS;
}
