#include <iostream>
{
    using namespace std;
int buscaDivisor(int n){
    
    if(n == 1){
       return 1;  
    }

    for (size_t i = 2; i <= n; ++i) {
        if (n % i == 0) {
            return i;
        }
    } 
    return 0;
}
