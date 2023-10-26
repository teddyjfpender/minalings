const chokidar = require('chokidar');
const { exec } = require('child_process');
const readline = require('readline');

const log = console.log.bind(console);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const fileToWatch = 'exercises/exercise-01-numbers/start.ts';

const watcher = chokidar.watch(fileToWatch, {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  usePolling: true, // use polling, which can help in certain situations
});

watcher
  .on('change', (path) => {
    log(`File ${path} has been changed. Running...`);

    exec(`bun run ${path}`, (error, stdout, stderr) => {
      if (error) {
        console.log(`Seems like there was an error in the changes you made!`);
        console.error(`exec error: ${error}`);

        rl.question('Would you like a hint? (yes/no) ', (answer) => {
          if (answer.toLowerCase() === 'yes') {
            exec(`bun run ${path.replace(/start.ts$/, 'hint.ts')}`, (hintStdout, hintStderr) => {
              if (hintStdout) log(`Hint: ${hintStdout}`);
              if (hintStderr) log(`Hint Error: ${hintStderr}`);
            });
          }
          // rl.close(); // optionally close the readline interface if not needed anymore
        });
        return;
      }
      if (stdout) log(`Output: ${stdout}`);
      if (stderr) log(`Error: ${stderr}`);
    });
  })
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'));
