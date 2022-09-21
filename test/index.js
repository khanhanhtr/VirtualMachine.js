'use strict'
import createMemory from "../createMemory.js";
import CPU from "../cpu.js";
import instructions from "../instructions.js";


// Adding some constants for readability 
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


export {
    cpu,
    writableBytes,
}




