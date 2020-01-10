const path = require('path');

const projectDir = __dirname;
const tsconfigPath = path.join(projectDir, 'scripts/gulp/tsconfig.json');

if (projectDir.includes(' ')) {
  console.error('Error: Cannot run the build tasks if the project is ' +
    'located in a directory with spaces in between. Please rename your project directory.');
  process.exit(1);
}

// Register TS compilation.
require('ts-node').register({
  project: tsconfigPath
});

require('./scripts/gulp/gulpfile');