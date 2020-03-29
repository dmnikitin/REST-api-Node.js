const fs = require('fs');
const { program } = require('commander');
const { pipeline, Transform, Writable } = require('stream');

program
  .option('-a, --actiontype <type>', 'action type: encode or decode')
  .option('-s, --shift <type>', 'shift number', parseInt)
  .option('-i, --input <type>', 'input file')
  .option('-o, --output <type>', 'output file');

program.parse(process.argv);

pipeline(inputStream(), transformStream(), outputStream(), err => {
  if (err) {
    console.error('Pipeline failed.', err);
  } else {
    console.log('Pipeline succeeded.');
  }
});

// .then((data, err) => { console.log('data', data, err) })

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

function transformStream() {
  const action = program.actiontype;
  let shift = program.shift;
  if (action === 'decode') shift = (26 - shift) % 26;
  if (shift < 0 || shift >= 26) {
    throw new Error('Shift is out of range');
  }

  return new Transform({
    objectMode: true,
    transform: (data, _, done) => {
      const input = data.toString();
      const output = caesarShift(input, shift);
      done(null, output);
    }
  });
}

function caesarShift(text, shift) {
  let string = text;
  string = string.replace(/[A-Z]/g, L =>
    String.fromCharCode(((L.charCodeAt(0) - 65 + shift) % 26) + 65)
  );
  string = string.replace(/[a-z]/g, L =>
    String.fromCharCode(((L.charCodeAt(0) - 97 + shift) % 26) + 97)
  );
  return string;
}
