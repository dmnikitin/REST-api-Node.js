const { Transform } = require('stream');
const { program } = require('commander');
const { caesarShift } = require('../helpers/caesarShift');

function transformStream() {
  const action = program.actiontype;
  let shift = program.shift;
  if (action === 'decode') shift = (26 - shift) % 26;

  return new Transform({
    objectMode: true,
    transform: (data, _, done) => {
      const input = data.toString();
      const output = caesarShift(input, shift);
      done(null, output);
    }
  });
}

exports.transformStream = transformStream;
