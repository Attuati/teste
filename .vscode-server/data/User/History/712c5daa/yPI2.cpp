//Programa que mostra 7 dias durante 4 semanas
/*1 - Altere o código abaixo para que o trecho de código dos fors e cout estar em uma 
função fora da função main.*/
#include <iostream>
#include <string>
 
using namespace std;

void dias(int m, int s, int d) 
{
    for (int i = 1; i <= s; ++i) {
       cout << "Semana: " << i << endl;
       for (int j = 1; j <= d; ++j) {
           cout <<"    Dia:" << j << endl;
       }
    }
    
}

 
int main(int argc, char *argv[])
{
   int mes = 1;
   int semanas = 4, diasDaSemana = 7;
 
   
   dias (mes, semanas, diasDaSemana);
 
   return 0;
}