@echo off
set TS_NODE_COMPILER_OPTIONS={"module": "commonjs"}
mocha -r ts-node/register "test/**/*.ts"