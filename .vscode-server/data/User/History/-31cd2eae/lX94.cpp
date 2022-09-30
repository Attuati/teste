#include <iostream>
#include <map>
using namespace std;

typedef map<char, int> mp;
map<char, int>::iterator it;
map<char, int>::iterator itM;

int main(int argc, char *argv[])
{
    string nome = argv[1];

    mp c1;
    int contador[nome.length()];
    int valor = 0;
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

        c1.insert(mp::value_type(nome[i], contador[i]));
        valor = 0;
    }
    for (it = c1.begin(); it != c1.end(); ++it)
    {
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
            itM = c1.lower_bound(maior);
        }
    }

    cout << "letra: " << itM->first << " mais recorrente e apareceu: " << itM->second << " vezes " << endl;
}
// Tudo que esta no trabalho pequei do youtube, algumas coisas atraves de chamadas de video pelo watts com amigos, mas a maior parte quem me ajudou foi um amigo formado em ciencias da computação Matheus Reizes.
