import {cpu, writableBytes, register_con} from './index.js';
import instructions from '../instructions.js';
import readline from 'readline'
//base on the ../Assembly-Code/psh-pop.asm

let i = 0;

writableBytes[i++] = instructions.MOV_LIT_REG;
writableBytes[i++] = 0x51; 
writableBytes[i++] = 0x51;
writableBytes[i++] = register_con.get('R1');


writableBytes[i++] = instructions.MOV_LIT_REG;
writableBytes[i++] = 0x42; 
writableBytes[i++] = 0x42; 
writableBytes[i++] = register_con.get('R2');


writableBytes[i++] = instructions.PSH_REG;
writableBytes[i++] = register_con.get('R1');
// test("Testing stack on r1" , () => {
//     expect(cpu.getRegister('sp')).toBe(0x5151);
// })

writableBytes[i++] = instructions.PSH_REG;
writableBytes[i++] = register_con.get('R2');
// test("Testing stack on r2" , () => {
//     expect(cpu.getRegister('sp')).toBe(0x4242);
// })

writableBytes[i++] = instructions.POP; 
writableBytes[i++] = register_con.get('R1');
// test("Testing r1", () => { 
//     expect(cpu.getRegister('r1')).toBe(0x4242);
// })



writableBytes[i++] = instructions.POP; 
writableBytes[i++] = register_con.get('R2');
// test("Testing r2", () => {
//     expect(cpu.getRegister('r2').toBe(0x5151));
// })


const readl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

readl.on('line',() => {
    cpu.step();
    cpu.debug();
    cpu.viewMemoryAt(cpu.getRegister('ip'));
    cpu.viewMemoryAt(0xffff - 7);
})

