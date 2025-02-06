import { spawn } from "node:child_process";

const command = 'npx';
const mochaArgs = process.argv.slice(2);
const args = ['mocha', "--recursive", "--exit", "--timeout 10000", "dist/tests/entityTests.js", ...mochaArgs];

const mochaProcess = spawn(command, args, {
  stdio: 'inherit', // Directly inherit the standard input/output
  shell: true // Run the command in a shell to interpret paths correctly
});

mochaProcess.on('error', (error) => {
  console.error(`Error executing tests: ${error.message}`);
});

mochaProcess.on('exit', (code) => {
  if (code === 0) {
    console.log('Tests completed successfully');
  } else {
    console.error(`Tests exited with code ${code}`);
  }
});