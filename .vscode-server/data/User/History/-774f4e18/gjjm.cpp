//Programa que mostra 7 dias durante 4 semanas
#include <iostream>
#include <string>
 
using namespace std;
 
int main(int argc, char *argv[])
{
 
   int maximo = 9;
   for (int i = 1; i <= maximo; ++i) {
       for (int j = 1; j <= i; ++j) {
           cout << i;
                 }
       cout << endl;
   }
 
   int mes = 1;
   int semanas = 4, diasDaSemana = 7;
 
   for (int i = 1; i <= semanas; ++i) {
       cout << "Semana: " << i << endl;
       for (int j = 1; j <= diasDaSemana; ++j) {
           cout <<"    Dia:" << j << endl;
       }
   }
 
   return 0;
}
