//We implement the memory through the array buffer

const createMemory = sizeInBytes => {
    const array_buffer = new ArrayBuffer(sizeInBytes);
    const data_view = new DataView(array_buffer);
    return data_view;
}

module.exports = createMemory;




