'use strict'
const createMemory = require("./createMemory");
const CPU = require("./cpu");
const instructions = require("./instructions");

// Adding some constants for readaility 
const IP  = 0;
const ACC = 1;
const R1  = 2;
const R2  = 3;


//Testing : Create the memory with 256 byte 
const memory = createMemory(256*256);
const writableBytes = new Uint8Array(memory.buffer)
//When we actually write to this writable byte , that will actually insert into 
//the array buffer

const cpu = new CPU(memory);

let i = 0;


//Moving the literal values into r1 instruction
writableBytes[i++] = instructions.MOV_LIT_REG;
writableBytes[i++] = 0x12; //testing literal value 1 0x1234
writableBytes[i++] = 0x34; 
writableBytes[i++] = R1;


//Moving the literal values into r2 instruction
writableBytes[i++] = instructions.MOV_LIT_REG;
writableBytes[i++] = 0xAB; //Testing literal value 2 0xABCD
writableBytes[i++] = 0xCD;
writableBytes[i++] = R2;

// Adding Register to register 
writableBytes[i++] = instructions.ADD_REG_REG;
writableBytes[i++] = R1; // Register1 index registers[r1] = 2
writableBytes[i++] = R2; // Register2 index registers[r2] = 3

// Instruction to move the reg back to the memory, where we store it in the acc reg
writableBytes[i++] = instructions.MOV_REG_MEM;
writableBytes[i++] = ACC;
writableBytes[i++] = 0x01;
writableBytes[i++] = 0x00; //0x0100
//Store the result inside an acc register, let make it far enough where the memory end 






cpu.debug();
cpu.viewMemoryAt(cpu.getRegister('ip'));
cpu.viewMemoryAt(0x0100);

cpu.step();
cpu.debug();
cpu.viewMemoryAt(cpu.getRegister('ip'));
cpu.viewMemoryAt(0x0100);

cpu.step();
cpu.debug();
cpu.viewMemoryAt(cpu.getRegister('ip'));
cpu.viewMemoryAt(0x0100);

cpu.step();
cpu.debug();
cpu.viewMemoryAt(cpu.getRegister('ip'));
cpu.viewMemoryAt(0x0100);


cpu.step();
cpu.debug();
cpu.viewMemoryAt(cpu.getRegister('ip'));
cpu.viewMemoryAt(0x0100);



