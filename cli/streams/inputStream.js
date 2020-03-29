const fs = require('fs');
const { program } = require('commander');
const exit = process.exit;

function inputStream() {
  if (!program.shift || !program.actiontype) {
    process.stderr.write('error: please pass required arguments' + '\n');
    exit(1);
  }
  if (program.input) {
    const path = `${__dirname}/../${program.input}`;
    fs.access(path, fs.constants.F_OK || fs.constants.W_OK, err => {
      if (err) {
        process.stderr.write(
          'error: -input file. invalid path or file is protected ' + '\n'
        );
        exit(1);
      }
    });
    return fs.createReadStream(path);
  }
  process.stdout.write(
    'no input file passed, but you can still provide a string to encode below: '
  );
  return process.stdin.on('data', data => {
    process.stdin.read(data);
  });
}

exports.inputStream = inputStream;
