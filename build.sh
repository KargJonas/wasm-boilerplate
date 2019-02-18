#! /bin/bash

exec emcc native.c -s ONLY_MY_CODE=1 -s WASM=1 -s EXPORTED_FUNCTIONS="['_add']" -o native.wasm