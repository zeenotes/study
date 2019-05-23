title: C Programming

## C Basics

### Writing

- writing a c program

- GCC - GNU Compiler Collection
    - allows to complie C code to run on the system

```c
#include <stdio.h> 
int main(int argc, char *argv[])
{
    if(argc < 2) 
    {
        printf("%s\n", "Pass your name as an argument");
        return 0; 
    }
    else
    {
                printf("Hello %s\n", argv[1]);
                return 0;
    }
}
```

`import stdio.h` - standard input and output library  
statements end with a semi-colon  
use the `return` statement to exit the function `main`  

### Compiling

- compiling the C program

```
root@kali:~# gcc cprogram.c -o cprogram
```

`-o` flag is used to mention the output file

- running the C program

```
root@kali:~# ./cprogram
Pass your name as an argument
```

- to use with an argument

```
root@kali:~# ./cprogram hazeez
Hello hazeez
```




