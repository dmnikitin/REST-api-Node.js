const { Transform } = require('stream');
const { program } = require('commander');
const { caesarShift } = require('../helpers/caesarShift');
const exit = process.exit;

function transformStream() {
  const action = program.actiontype;
  let shift = program.shift;
  if (action === 'decode') shift = (26 - shift) % 26;
  if (shift < 0 || shift >= 26) {
    process.stderr.write('error: shift is out of range' + '\n');
    exit(1);
  }

  return new Transform({
    objectMode: true,
    transform: (data, _, done) => {
      process.stdin.on('data', newData => {
        if (newData) {
          process.stdout.write(
            `output value: ${caesarShift(newData.toString(), shift)}`
          );
          process.stdin.read(newData);
        }
      });
      const input = data.toString();
      const output = caesarShift(input, shift);
      done(null, output);
    }
  });
}

exports.transformStream = transformStream;
