'use strict'
import createMemory from "../createMemory.js";
import CPU from "../cpu.js";
import instructions from "../instructions.js";


// Adding some constants for readability 
const register_con = new Map()
register_con.set('IP' , 0 );
register_con.set('ACC', 1 );
register_con.set('R1' , 2 );
register_con.set('R2' , 3 );
register_con.set('R3' , 4 );
register_con.set('R4' , 5 );
register_con.set('R5' , 6 );
register_con.set('R6' , 7 );
register_con.set('R7' , 8 );
register_con.set('R8' , 9 );
register_con.set('SP' , 10 )
register_con.set('FP' , 11 );





//Testing : Create the memory with 256 byte 
const memory = createMemory(256*256);
const writableBytes = new Uint8Array(memory.buffer)
//When we actually write to this writable byte , that will actually insert into 
//the array buffer

const cpu = new CPU(memory);


export {
    cpu,
    writableBytes,
    register_con,
}




