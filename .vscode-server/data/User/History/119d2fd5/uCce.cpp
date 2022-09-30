#include <cstdlib>
#include <iostream>
 
int main( ) {
    int media, x, y;
    std::cout << "Digite dois números: "<< std::endl;
    std::cin >> x >> y;
    media=(x+y)/2;
    std::cout<< "A média aritmética é: "<<media<< std::endl;
    if (media<10){
        std::cout<< "Digite valores maiores!"<<std::endl;
    }
    else if (media>10 || x>0 || y>0) {
        if ( x<y || x<5 ) {
            std::cout<<"O primeiro numero é muito pequeno"<<std::endl;
        }
        if (x>y || x<5 ) {
            std::cout<<"O segundo numero digitado é muito pequeno"<<std::endl;
        }
        else {
            std::cout<<"A média é 10"<<std::endl;
        }
        }
    if (x>y) {
        std::cout << "O primeiro valor digitado é maior: "<<x<< std::endl;
            while (x>y) {
            std::cout <<y<<std::endl;
            y++;
    }  
    } else if (y>x){
        std::cout << "O segundo valor digitado é maior: "<<y<< std::endl;
            while (y>x) {
            std::cout <<x<<std::endl;
            x++;
    }  
    } else if (x==y){
        std::cout << "Os valores são iguais"<< std::endl;
    }

    return EXIT_SUCCESS;
}

