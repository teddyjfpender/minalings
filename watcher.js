const chokidar = require('chokidar');
const { exec } = require('child_process');

const log = console.log.bind(console);

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
        console.error(`exec error: ${error}`);
        return;
      }
      if (stdout) log(`Output: ${stdout}`);
      if (stderr) log(`Error: ${stderr}`);
    });
  })
  .on('error', error => log(`Watcher error: ${error}`))
  .on('ready', () => log('Initial scan complete. Ready for changes'));
