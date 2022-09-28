// Simple program to move r1 and r2 

mov $5151, r1 
mov $4242, r2 

psh r1  //Push value from r1 to stack 
psh r2  //push value from r2 to stack 
pop r1  //Pop value from stack (last , now it is r2) to r1 
pop r2  //Pop value from stack (last, now it is r1) to r2

// Basically we complete interchange the value of r1, r2;
