'use strict'
import createMemory from "./createMemory.js";
import instructions from "./instructions.js";
export default class CPU {
    constructor(memory) {
      this.memory = memory;
  
      this.registerNames = [
        /* Flow the stack.md in ./Assembly-Code, We add two more register, frame pointer and frame size
        */
        'ip', 'acc',
        'r1', 'r2', 'r3', 'r4',
        'r5', 'r6', 'r7', 'r8',
        'sp' , 'fp'
      ];
     
      this.registers = createMemory(this.registerNames.length * 2);
  
      this.registerMap = this.registerNames.reduce((map, name, i) => {
        map[name] = i * 2;
        return map;
      }, {});

      /* let make it simple, by making the sp, and fp start at the 
      very end of the memory
      */
      this.setRegister('sp', memory.byteLength - 2); 
      this.setRegister('fp', memory.byteLength - 2);
    }
    
    
    push(value){ 
      const spAddress = this.getRegister('sp');
      this.memory.setUint16(spAddress,value);
      this.setRegister('sp',spAddress - 2);
    }

    pop(){ 
      const nextSpAddress = this.getRegister('sp') + 2;
      this.setRegister('sp',nextSpAddress);
      return this.memory.getUint16(nextSpAddress);
    }
    fetchRegisterIndex(){ 
      return (this.fetch8() % this.registerNames.length ) *2
    }


    debug() {
      this.registerNames.forEach(name => {
        console.log(`${name}: 0x${this.getRegister(name).toString(16).padStart(4, '0')}`);
      });
      console.log();
    }
  
    viewMemoryAt(address) {
      // 0x0f01: 0x04 0x05 0xA3 0xFE 0x13 0x0D 0x44 0x0F
      const nextEightBytes = Array.from({length: 8}, (_, i) =>
        this.memory.getUint8(address + i)
      ).map(v => `0x${v.toString(16).padStart(2, '0')}`);
  
      console.log(`0x${address.toString(16).padStart(4, '0')}: ${nextEightBytes.join(' ')}`);
    }
  
    getRegister(name) {
      if (!(name in this.registerMap)) {
        throw new Error(`getRegister: No such register '${name}'`);
      }
      return this.registers.getUint16(this.registerMap[name]);
    }
  
    setRegister(name, value) {
      if (!(name in this.registerMap)) {
        throw new Error(`setRegister: No such register '${name}'`);
      }
      return this.registers.setUint16(this.registerMap[name], value);
    }
  
    fetch8() {
      const nextInstructionAddress = this.getRegister('ip');
      const instruction = this.memory.getUint8(nextInstructionAddress);
      this.setRegister('ip', nextInstructionAddress + 1);
      return instruction;
    }
  
    fetch16() {
      const nextInstructionAddress = this.getRegister('ip');
      const instruction = this.memory.getUint16(nextInstructionAddress);
      this.setRegister('ip', nextInstructionAddress + 2);
      return instruction;
    }
  
    execute(instruction) {
      switch (instruction) {
        // Move literal into register
        case instructions.MOV_LIT_REG: {
          const literal = this.fetch16();
          const register = this.fetchRegisterIndex();
          this.registers.setUint16(register, literal);
          return;
        }
  
        // Move register to register
        case instructions.MOV_REG_REG: {
          const registerFrom = this.fetchRegisterIndex();
          const registerTo = this.fetchRegisterIndex();
          const value = this.registers.getUint16(registerFrom);
          this.registers.setUint16(registerTo, value);
          return;
        }
  
        // Move register to memory
        case instructions.MOV_REG_MEM: {
          const registerFrom = this.fetchRegisterIndex();
          const address = this.fetch16();
          const value = this.registers.getUint16(registerFrom);
          this.memory.setUint16(address, value);
          return;
        }
  
        // Move memory to register
        case instructions.MOV_MEM_REG: {
          const address = this.fetch16();
          const registerTo = this.fetchRegisterIndex();
          const value = this.memory.getUint16(address);
          this.registers.setUint16(registerTo, value);
          return;
        }
  
        // Add register to register
        case instructions.ADD_REG_REG: {
          const r1 = this.fetch8();
          const r2 = this.fetch8();
          const registerValue1 = this.registers.getUint16(r1 * 2);
          const registerValue2 = this.registers.getUint16(r2 * 2);
          this.setRegister('acc', registerValue1 + registerValue2);
          return;
        }
  
        // Jump if not equal
        case instructions.JMP_NOT_EQ: {
          const value = this.fetch16();
          const address = this.fetch16();
  
          if (value !== this.getRegister('acc')) {
            this.setRegister('ip', address);
          }
  
          return;
        }
        //Push Literal to stack 
        case instructions.PSH_LIT: {
          const value = this.fetch16();
          this.push(value);
          return;
        }
        //Push register to stack 
        case instructions.PSH_REG: { 
          const registerIndex = this.fetchRegisterIndex();
          this.push(this.registers.getUint16(registerIndex));
          return;

        }

        //Pop Stack to register 
        case instructions.POP: {
          const registerIndex = this.fetchRegisterIndex();
          const value =this.pop();
          this.registers.setUint16(registerIndex,value);
          return; 
        }
      }
    }
      
  
    step() {
      const instruction = this.fetch8();
      return this.execute(instruction);
    }
  }