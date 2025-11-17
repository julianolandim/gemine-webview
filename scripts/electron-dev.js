const { spawn } = require('child_process');
const electron = require('electron');
const path = require('path');

const electronPath = electron;
const mainPath = path.join(__dirname, '../electron/main.cjs');

const electronProcess = spawn(electronPath, [mainPath], {
  stdio: 'inherit',
  env: {
    ...process.env,
    NODE_ENV: 'development'
  }
});

electronProcess.on('close', (code) => {
  process.exit(code);
});
