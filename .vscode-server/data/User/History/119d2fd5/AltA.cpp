#include <cstdlib>
#include <iostream>
 
int main( ) {
    int x, y;
    std::cout << "Digite dois números: ";
    std::cin >> x >> y;
 
    int soma = x + y;
 
    std::cout << "A soma dos números é: " << soma << std::endl;
    if (x>y)
    std::cout << "O valor de x e maior que y " << soma << std::endl;
 
    return EXIT_SUCCESS;
}
