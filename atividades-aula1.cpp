#include <cstdlib>
#include <iostream>
 
int soma(int x, int y){

    return x + y;
}

int main( ) {
   int x, y;
   std::cout << "Digite dois números: ";
   std::cin >> x >> y;
 
   std::cout << "A soma dos números é: " << soma(x,y) << std::endl;
 
   return EXIT_SUCCESS;
}