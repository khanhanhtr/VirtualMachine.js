import {cpu, writableBytes, register_con} from './index.js';
import instructions from '../instructions.js';
import readline from 'readline'

/* Implementation of Assembly program in /Assembly/CountTo3.asm*/



let i = 0;

//Start Label --> &address0/

//Mov &0x0100, r1// 
writableBytes[i++] = instructions.MOV_MEM_REG;
writableBytes[i++] = 0x01;
writableBytes[i++] = 0x00;
writableBytes[i++] = register_con.get('R1');

//Mov 0x0001, r2//
writableBytes[i++] = instructions.MOV_LIT_REG;
writableBytes[i++] = 0x00;
writableBytes[i++] = 0x01;
writableBytes[i++] = register_con.get('R2');

//Add R1, R2//
writableBytes[i++] = instructions.ADD_REG_REG;
writableBytes[i++] = register_con.get('R1');
writableBytes[i++] = register_con.get('R2');

//Mov acc, &0x0100
writableBytes[i++] = instructions.MOV_REG_MEM;
writableBytes[i++] = register_con.get('ACC');
writableBytes[i++] = 0x01;
writableBytes[i++] = 0x00;

//jne 0x0003 <literal> m start: -> &0 //
writableBytes[i++] = instructions.JMP_NOT_EQ;
writableBytes[i++] = 0x00;
writableBytes[i++] = 0x03;
writableBytes[i++] = 0x00;
writableBytes[i++] = 0x00;



cpu.debug();
    cpu.viewMemoryAt(cpu.getRegister('ip'));
    cpu.viewMemoryAt(0x0100);

const readl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

readl.on('line',() => {
    cpu.step();
    cpu.debug();
    cpu.viewMemoryAt(cpu.getRegister('ip'));
    cpu.viewMemoryAt(0x0100);
})


export {writableBytes};