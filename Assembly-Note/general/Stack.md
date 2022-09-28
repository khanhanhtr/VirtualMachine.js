
# The stack and it implementations 
By introduce the stack, we can bring a little abstraction on how to work with memory   
Essentially the stack is a given region of the memory along with the pointer (By pointer we mean that an address we can keep track of to tell us that this is where the stack right now) -- We will implement the stack pointer register (sp) for this purpose

We can use the region of the memory (the stack) to temporarily store state , as we keep track of the stck, the pointer (the stack pointer) moving around   

The implementation of the stacks can bring 2 specific benefits : 
**Temporary value** 
``` JavaScript
let a = 0x42;
let b = 0xff;

let tmp = b 
b = a;
a = tmp;
```
**Modular Code**
``` JavaScript 
function add3Numbers(a,b,c) { 
    return a + b + c;
}

function main() { 
    doSomeThing(); //Sub Routine  
    add3Number(1,2,3); // Sub Routine
    doMoreStuff(); //Sub Routine
}
```


Everytime we push on to the stack with instructions for example: 

``` asm
psh r2 
$18 $04
``` 
We actually decrement the stack by 2 byte, on the other hand when pop the stack, the stack will incremented by 2 byte.  

The reason for this is that , the stack will go upward , for the implement of LIFO (last in first out). In this case, the implement of subroutine will actually work 

## Calling Convention 
In our architecture, argument to functions are always pushed onto the stack, this's what known as the calling convention  

When we call the sub-routine, the return value end up in the acc registers 
For example : 
``` ASM
//We push 1,2,3 onto the stack 

psh $0001   //Literal value 1 
psh $0002   //Literal value 2
psh $0003   //Literal value 3

//Then push another number 3 onto the stack, to state that, there are 3 arguments for the next function call 
psh $00003

// Introduce the add_3_numbers function to add 3 literal values . By now, we don't actually know what is the implementation of the add_3_numbers function is but , we do know that it has to use some of the register (the working state of a CPU) to make it work. 
cal add_3_numbers ; 
// After calling thi sub routine, the acc register will have the value of $0006 , then the corresponding address in the stack will have the value of those register, finally, the next value on the stack will be the 'ip' registers which actually contain the return address for this particular subroutine. 
// We call this data structure a stack frame

```
One more thing to note that, the stack will not pop and push a single value, but the whole stack frame at a single point in time. 

--> In summary , the abstract stack, can call the stack frame (data structure for subroutine [function]), the stack frame in turn contain the stack frame size and context (register value) at a single point in time.