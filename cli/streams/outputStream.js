const fs = require('fs');
const { program } = require('commander');
const exit = process.exit;

function outputStream() {
  const path = `${__dirname}/../${program.output}`;
  if (program.output) {
    fs.access(path, fs.constants.F_OK || fs.constants.W_OK, err => {
      if (err) {
        process.stderr.write(
          'Error: - output file. invalid path or file is protected ' + '\n'
        );
        exit(1);
      } else {
        return fs.createWriteStream(path, { flags: 'a', encoding: 'utf8' });
      }
    });
  }
  return process.stdout;
}

exports.outputStream = outputStream;
