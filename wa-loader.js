const __waLoadedCallbacks__ = [];

function waLoaded(callback) {
  __waLoadedCallbacks__.push(callback);
}

(() => {
  const memory = new WebAssembly.Memory({ initial: 256, maximum: 256 });
  const importObj = {
    env: {
      abortStackOverflow() { throw new Error('overflow') },
      table: new WebAssembly.Table({ initial: 0, maximum: 0, element: 'anyfunc' }),
      __table_base: 0,
      __memory_base: 1024,
      memory,
      STACKTOP: 0,
      STACK_MAX: memory.buffer.byteLength,
    }
  };
  fetch('native.wasm').then((response) => response.arrayBuffer())
    .then((bytes) => WebAssembly.instantiate(bytes, importObj))
    .then((wa) => {
      const obj = {};

      Object.entries(wa.instance.exports).map(entry => {
        obj[entry[0].slice(1)] = entry[1]
      });

      return obj;
    })
    .then(waFuncs => {
      __waLoadedCallbacks__.map(callback => callback(waFuncs));
    });
})();