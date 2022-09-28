import {cpu, writableBytes, register_con} from './index.js';
import instructions from '../instructions.js'

let i = 0
//Moving the literal values into r1 instruction
writableBytes[i++] = instructions.MOV_LIT_REG;
writableBytes[i++] = 0x12; //testing literal value 1 0x1234
writableBytes[i++] = 0x34; 
writableBytes[i++] = register_con.get('R1');
// test("Testing Register 1 value", () => {
//     expect(cpu.getRegister('r1')).toBe(0x1234); 
// })

//Moving the literal values into r2 instruction
writableBytes[i++] = instructions.MOV_LIT_REG;
writableBytes[i++] = 0xAB; //Testing literal value 2 0xABCD
writableBytes[i++] = 0xCD;
writableBytes[i++] = register_con.get('R2');
// test("Testing Register 2 value", () => {
//     expect(cpu.getRegister('r2')).toBe(0xABCD);
// })

// Adding Register to register 
writableBytes[i++] = instructions.ADD_REG_REG;
writableBytes[i++] = register_con.get('R1'); // Register1 index registers[r1] = 2
writableBytes[i++] = register_con.get('R2'); // Register2 index registers[r2] = 3
// test("Testing Register 2 value", () => {
//     expect(cpu.getRegister('acc')).toBe(0xABCD + 0x1234);
// })


// Instruction to move the reg back to the memory, where we store it in the acc reg
writableBytes[i++] = instructions.MOV_REG_MEM;
writableBytes[i++] = register_con.get('ACC');
writableBytes[i++] = 0x01;
writableBytes[i++] = 0x00; //0x0100
//Store the result inside an acc register, let make it far enough where the memory end 
// test("Testing Register 2 value", () => {
//     expect(cpu.memory.getUint16(0x0100)).toBe(0xABCD + 0x1234);
// })

export {writableBytes} 


