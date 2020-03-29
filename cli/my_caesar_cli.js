const { program } = require('commander');
const { pipeline } = require('stream');
const { inputStream } = require('./streams/inputStream');
const { outputStream } = require('./streams/outputStream');
const { transformStream } = require('./streams/transformStream');

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
