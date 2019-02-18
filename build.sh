#! /bin/bash

exec emcc src/native.c -s ONLY_MY_CODE=1 -s WASM=1 -s EXPORT_ALL=1 -s LINKABLE=1 -o build/native.wasm