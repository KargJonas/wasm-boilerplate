### This is a boilerplate for small WebAssembly projects.

- `npm run build` builds `src/native.c` using emscripten and `build.sh`
- `test/wa-loader.js` provides a `waLoad(FILE, CALLBACK)` method, which can be used to load and run a WASM file.

#### How to install emscripten: https://emscripten.org/docs/getting_started/downloads.html