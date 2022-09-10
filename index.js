const createMemory = require("./createMemory");
const CPU = require("./cpu");
const instructions = require("./instructions");

//Testing : Create the memory with 256 byte 
const memory = createMemory(256);
const writableBytes = new Uint8Array(memory.buffer)
//When we actually write to this writable byte , that will actually insert into 
//the array buffer

const cpu = new CPU(memory);

//Moving the literal values into r1 instruction
writableBytes[0] = instructions.MOV_LIT_R1;
writableBytes[1] = 0x12; //testing literal value 1 0x1234
writableBytes[2] = 0x34; 


//Moving the literal values into r2 instruction
writableBytes[3] = instructions.MOV_LIT_R2;
writableBytes[4] = 0xAB; //Testing literal value 2 0xABCD
writableBytes[5] = 0xCD;

// Adding Register to register 
writableBytes[6] = instructions.ADD_REG_REG;
writableBytes[7] = 2; // Register1 index registers[r1] = 2
writableBytes[8] = 3; // Register2 index registers[r2] = 3

cpu.debug();

cpu.step();
cpu.debug();

cpu.step();
cpu.debug();

cpu.step();
cpu.debug();




