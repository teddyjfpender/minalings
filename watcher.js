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
  .on('ready', () => log(`
   █████   ███   █████          ████                                                 █████                                    
  ░░███   ░███  ░░███          ░░███                                                ░░███                                     
   ░███   ░███   ░███   ██████  ░███   ██████   ██████  █████████████    ██████     ███████    ██████                         
   ░███   ░███   ░███  ███░░███ ░███  ███░░███ ███░░███░░███░░███░░███  ███░░███   ░░░███░    ███░░███                        
   ░░███  █████  ███  ░███████  ░███ ░███ ░░░ ░███ ░███ ░███ ░███ ░███ ░███████      ░███    ░███ ░███                        
    ░░░█████░█████░   ░███░░░   ░███ ░███  ███░███ ░███ ░███ ░███ ░███ ░███░░░       ░███ ███░███ ░███                        
      ░░███ ░░███     ░░██████  █████░░██████ ░░██████  █████░███ █████░░██████      ░░█████ ░░██████                         
       ░░░   ░░░       ░░░░░░  ░░░░░  ░░░░░░   ░░░░░░  ░░░░░ ░░░ ░░░░░  ░░░░░░        ░░░░░   ░░░░░░                          
                                                                                                                              
                                                                                                                              
                                                                                                                              
    █████    █████                  ██████   ██████  ███                                                                      
   ░░███    ░░███                  ░░██████ ██████  ░░░                                                                       
   ███████   ░███████    ██████     ░███░█████░███  ████  ████████    ██████   █████ █████  ██████  ████████   █████   ██████ 
  ░░░███░    ░███░░███  ███░░███    ░███░░███ ░███ ░░███ ░░███░░███  ░░░░░███ ░░███ ░░███  ███░░███░░███░░███ ███░░   ███░░███
    ░███     ░███ ░███ ░███████     ░███ ░░░  ░███  ░███  ░███ ░███   ███████  ░███  ░███ ░███████  ░███ ░░░ ░░█████ ░███████ 
    ░███ ███ ░███ ░███ ░███░░░      ░███      ░███  ░███  ░███ ░███  ███░░███  ░░███ ███  ░███░░░   ░███      ░░░░███░███░░░  
    ░░█████  ████ █████░░██████     █████     █████ █████ ████ █████░░████████  ░░█████   ░░██████  █████     ██████ ░░██████ 
     ░░░░░  ░░░░ ░░░░░  ░░░░░░     ░░░░░     ░░░░░ ░░░░░ ░░░░ ░░░░░  ░░░░░░░░    ░░░░░     ░░░░░░  ░░░░░     ░░░░░░   ░░░░░░  
                                                                                                                              
     
     Is this your first time? Don't worry, Minalings was made for beginners! We are
     going to teach you a lot of things about Mina & o1js, but before we can get
     started, here's a couple of notes about how Minalings operates:
     
     1. The central concept behind Minalings is that you solve exercises. These
        exercises usually have some sort of syntax error in them, which will cause
        them to fail compilation or testing. Sometimes there's a logic error instead
        of a syntax error. No matter what error, it's your job to find it and fix it!
        You'll know when you fixed it because then, the exercise will compile and
        Minalings will be able to move on to the next exercise.
     2. If you run Minalings in watch mode (which we recommend), it'll automatically
        start with the first exercise. Don't get confused by an error message popping
        up as soon as you run Minalings! This is part of the exercise that you're
        supposed to solve, so open the exercise file in an editor and start your
        detective work!
     3. If you're stuck on an exercise, there is a helpful hint you can view by saving the file
        you're working on (in watch mode). To get the hint simply type "yes" in the terminal when prompted.                                                                                   
                                   `));
