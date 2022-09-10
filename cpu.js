const createMemory = require("./createMemory");
const instructions = require("./instructions")

class CPU { 
    constructor(memory){
        this.memory = memory;
        this.registerNames = [
            /* We define 2 special registers : instruction pointer and accumulator, 
            where ip point to the next instruction and acc hold the result of 
            mathematical operation */
            'ip', 'acc',
            'r1', 'r2', 'r3', 'r4',
            'r5', 'r6', 'r7', 'r8'
        ];
        /* each register will have the length of 2 bytes -- equivalent to each register 
         will be 16 bits wide */
        this.registers = createMemory(this.registerNames.length * 2);
        //Define the regsiter name look up table
        this.registerMap = this.registerNames.reduce((map, name, i) => {
            map[name] = i * 2
            return map
        },{});
    }
    debug(){
        this.registerNames.forEach(name => {
            console.log(`${name}: 0x${this.getRegister(name).toString(16).padStart(4,'0')}`);
        })
        console.log()
    }

    getRegister(name) {
        if (!(name in this.registerMap)){
            throw new Error(`Getting register failed: ${name}`)
        }
        return this.registers.getUint16(this.registerMap[name]);

    }
    setRegister(name,value) {
        if (!(name in this.registerMap)){
            throw new Error()
        }
        return this.registers.setUint16(this.registerMap[name],value);
    }
    //CPU processes cycle method
    fetch8(){
        const nextInstructionAddress = this.getRegister('ip');
        const instruction = this.memory.getUint8(nextInstructionAddress)
        this.setRegister('ip',nextInstructionAddress + 1);
        return instruction;
    }
    // Use to fetch 1 byte instruction and move the instruction pointer by 1 byte 


    fetch16(){
        const nextInstructionAddress = this.getRegister('ip');
        const instruction = this.memory.getUint16(nextInstructionAddress)
        this.setRegister('ip',nextInstructionAddress + 2);
        return instruction;
    }
    //Combine decode with execution into the simple switch statement
    execute(instruction){
        switch(instruction){
            case instructions.MOV_LIT_R1: {
                const literal = this.fetch16();
                this.setRegister('r1',literal);
                return;
            }
            case instructions.MOV_LIT_R2: {
                const literal = this.fetch16();
                this.setRegister('r2',literal);
                return;
            }
            case instructions.ADD_REG_REG: {
                const r1 = this.fetch8()
                const r2 = this.fetch8()
                const registerValue1 = this.registers.getUint16(r1 * 2)
                const registerValue2 = this.registers.getUint16(r2 * 2)
                this.setRegister('acc', registerValue1 + registerValue2)
                return;
            }
        }
    }
    step() {
        const instruction = this.fetch8();
        return this.execute(instruction)
    }
}


module.exports = CPU;