const { exec, spawn } = require('child_process');
const colors = require('colors');

// Configure colors
colors.setTheme({
  info: 'cyan',
  success: 'green',
  warn: 'yellow',
  error: 'red',
});

function killPort5000() {
  return new Promise((resolve) => {
    console.log(colors.info('🔍 Checking if port 5000 is in use...'));

    // Check what's running on port 5000
    exec('lsof -ti:5000', (error, stdout, stderr) => {
      if (stdout.trim()) {
        const pid = stdout.trim();
        console.log(
          colors.warn(`⚠️  Port 5000 is being used by process ${pid}`),
        );
        console.log(colors.warn(`🔨 Killing process ${pid}...`));

        // Kill the process
        exec(`kill -9 ${pid}`, (killError) => {
          if (killError) {
            console.log(
              colors.error(`❌ Failed to kill process: ${killError.message}`),
            );
          } else {
            console.log(colors.success('✅ Process killed successfully'));
          }
          setTimeout(resolve, 1000); // Wait 1 second before continuing
        });
      } else {
        console.log(colors.success('✅ Port 5000 is free'));
        resolve();
      }
    });
  });
}

async function startDev() {
  await killPort5000();

  console.log(
    colors.info('🚀 Starting development server with colorful logging...'),
  );

  // Start nodemon
  const nodemon = spawn(
    'nodemon',
    ['--watch', 'src', '--ext', 'ts', '--exec', 'ts-node src/index.ts'],
    {
      stdio: 'inherit',
      shell: true,
    },
  );

  nodemon.on('error', (err) => {
    console.log(colors.error(`❌ Failed to start nodemon: ${err.message}`));
    process.exit(1);
  });

  nodemon.on('close', (code) => {
    console.log(colors.info(`📁 Nodemon exited with code ${code}`));
  });

  // Handle Ctrl+C gracefully
  process.on('SIGINT', () => {
    console.log(colors.warn('\n🛑 Shutting down development server...'));
    nodemon.kill('SIGINT');
    process.exit(0);
  });
}

startDev().catch((err) => {
  console.log(
    colors.error(`❌ Error starting development server: ${err.message}`),
  );
  process.exit(1);
});
