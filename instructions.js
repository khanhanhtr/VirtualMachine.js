'use strict'
/* Essentially our values (literal and instructions) can be move back and 
forward between register and memory also between registers themselves.
So for what instruction we currently have is to move the literal from main memory 
to register, let add some more 
// Now because registers encoded in bytes are hard to change , we will change the way 
Move elemenet implement 
*/
const MOV_LIT_REG = 0x10;   // Move Literal to register 
const MOV_REG_REG = 0x11;   // Move register to register 
const MOV_REG_MEM = 0x12;   // Move register to memory 
const MOV_MEM_REG = 0x13;   // Move memory to register 
const ADD_REG_REG = 0x14;   // Add register to register


module.exports = {
    MOV_LIT_REG,
    MOV_REG_MEM,
    MOV_REG_REG,
    MOV_MEM_REG,
    ADD_REG_REG,
};