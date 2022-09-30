include <iostream>
#include <map> // for map operations

using namespace std;

// declarar map
typedef map<char, int> mp; // documentação pesquisada
// cria iterador com nome it
map<char, int>::iterator it;  // documentação pesquisada
map<char, int>::iterator itM; // documentação pesquisada

int main(int argc, char *argv[])
{
    string nome = argv[1];
    // nomeia o mapa
    mp c1; // documentação pesquisada
    int contador[nome.length()];
    int valor = 0;
    // compara as letras
    for (int i = 0; i < nome.length(); i++)
    {
        for (int j = 0; j < nome.length(); j++)
        {
            if (nome[i] == nome[j])
            {
                valor++;
                contador[i] = valor;
            }
        }
        // armazena os valores dentro do map
        c1.insert(mp::value_type(nome[i], contador[i])); // documentação pesquisada
        valor = 0;
    }
    // usa iterador para falar os valores de dentro do map
    for (it = c1.begin(); it != c1.end(); ++it) // documentação pesquisada
    {
        // cout << it->first << " => " << it->second <<endl;
        if (it->second > 1)
        {
            cout << "letras: " << it->first << " repetiu: " << it->second << " vezes" << endl;
        }
        else
        {
            cout << "letras: " << it->first << " sairam apenas " << it->second << " vez" << endl;
        }
    }

    int maior = 0;
    for (int i = 0; i < nome.length(); i++)
    {
        if (maior < contador[i])
        {
            maior = contador[i];
            itM = c1.lower_bound(maior); // documentação pesquisada
        }
    }

    cout << "letra: " << itM->first << " mais recorrente e apareceu: " << itM->second << " vezes " << endl;
}
// documentação pesquisada:
// https://docs.microsoft.com/pt-br/cpp/standard-library/map-operators?view=msvc-170
