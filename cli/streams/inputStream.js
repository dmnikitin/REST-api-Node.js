const fs = require('fs');
const { program } = require('commander');

function inputStream() {
  if (!program.shift || !program.actiontype) {
    process.stderr.write('error: please pass required arguments' + '\n');
    const exit = process.exit;
    exit(1);
  }

  if (program.input) {
    return fs.createReadStream(`${__dirname}/${program.input}`);
  }
  console.log(
    'no input file passed, but you can still provide a string to encode below: '
  );
  return process.stdin.on('data', () => {
    process.stdin.read();
  });
}

exports.inputStream = inputStream;
