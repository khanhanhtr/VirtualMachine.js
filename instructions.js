/* We first define some fundamental base instructions
Our core instruction shoulds has some instructions for these categories: 
Moving Data , Math manipulation , Jumping Around to different part of a program 
Making comparisions and decisions  , Running subroutines and return to previous state
*/

/* 
    Due to an assumsing that these instructions will be used often in our VM, 
    we dedicate these bytes specific for instruction moving to r1, r2 and adding register
    Otherwise we can save memory with the other less frequent use instruction
*/
const MOV_LIT_R1  = 0x10; 
const MOV_LIT_R2  = 0x11;
const ADD_REG_REG = 0x12;


module.exports = {
    MOV_LIT_R1,
    MOV_LIT_R2,
    ADD_REG_REG,
};