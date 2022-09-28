/* 
    Start is defined as label, where it indicate an address in memory 
    When refer to the label start, it mean refer to that particular 
    address which is 0 
    Where &0x0100 refer to memory address

    So our comparision value will be 3, so the value inside the acc
    which in this case should be whatever in r1 + 1, if not three it will jump to the 
    start of a program
*/

Start: 
    mov &0x0100, r1 
    mov 0x0001,  r2
    add r1, r2
    mov acc, &0x0100 
    jne 0x0003, start: 
