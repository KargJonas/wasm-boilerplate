const __waImportObj__ = (() => {
  const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });

  return {
    env: {
      abortStackOverflow() { throw new Error("overflow") },
      table: new WebAssembly.Table({ initial: 0, maximum: 0, element: "anyfunc" }),
      __table_base: 0,
      __memory_base: 1024,
      memory: memory,
      STACKTOP: 0,
      STACK_MAX: memory.buffer.byteLength,
    }
  }
})();

function waLoad(file, callback) {
  fetch(file)
    .then((response) => response.arrayBuffer())
    .then((bytes) => WebAssembly.instantiate(bytes, __waImportObj__))
    .then((wa) => {
      const waFuncs = {};

      Object
        .entries(wa.instance.exports)
        .map(entry => waFuncs[entry[0].slice(1)] = entry[1]);

      return waFuncs;
    })
    .then(callback)
    .catch(err => { throw err });
}