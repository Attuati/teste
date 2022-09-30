#include <cstdlib>
#include <iostream>
using namespace std;
void f(int valor, int& ref) {
  valor++;
  ref++;
  cout << "Valor (gato) na função f : " << valor << endl;
  cout  << "Ref (cachorro) na função f : " << ref << endl;
}
int main() {
  int gato = 1;
  int cachorro = 5;
  cout << "Antes - Valor de gato na função main: " << gato << endl;
  cout << "Antes - Valor de cachorro na função main: " << cachorro << endl;
  f(gato, cachorro);
  cout << "Depois - Valor de gato na função main: " << gato << endl;
  cout << "Depois - Valor de cachorro na função main: " << cachorro << endl;
  return EXIT_SUCCESS;
}
