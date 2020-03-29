const fs = require('fs');
const { Writable } = require('stream');
const { program } = require('commander');

function outputStream() {
  if (!program.output) {
    return process.stdout;
  }

  return new Writable({
    objectMode: true,
    write: data => {
      fs.appendFile(`${__dirname}/${program.output}`, data, err => {
        process.stdout.write(
          err
            ? 'Error: cant access file'
            : 'The file has been saved successfully!' + '\n'
        );
      });
    }
  });
}

exports.outputStream = outputStream;
