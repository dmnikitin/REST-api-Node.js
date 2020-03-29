const fs = require('fs');
const { Writable } = require('stream');
const { program } = require('commander');
const exit = process.exit;

function outputStream() {
  if (!program.output) {
    return process.stdout;
  }

  return new Writable({
    objectMode: true,
    write: data => {
      const path = `${__dirname}/../${program.output}`;
      fs.access(path, fs.constants.F_OK || fs.constants.W_OK, err => {
        if (err) {
          process.stderr.write(
            'Error: - output file. invalid path or file is protected ' + '\n'
          );
          exit(1);
        } else {
          fs.appendFile(path, data, () =>
            process.stdout.write('The file has been saved successfully!' + '\n')
          );
        }
      });
    }
  });
}

exports.outputStream = outputStream;
