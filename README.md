### This is a boilerplate project for small WebAssembly projects.

- `npm run build` builds `src/native.c` using emscripten and `build.sh`
- `test/wa-loader.js` provides a `waLoad(FILE, CALLBACK)` method, which can be used to load and run a WASM file.