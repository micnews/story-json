#!/usr/bin/env node

const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2), {
  boolean: ['help'],
});
const validate = require('../validator');

function usage() {
  console.log('USAGE: story-json-validate <story.json>');
  console.log('');
  console.log('OPTIONS:');
  console.log('  --help                   Show this message');
  process.exit(1);
}

if (argv.help) {
  usage();
}

const input = argv._[0];
if (!input) {
  usage();
}

let json;
try {
  json = JSON.parse(fs.readFileSync(input, 'utf8'));
} catch (e) {
  console.error(`Unable to load json ${input}`);
  process.exit(1);
}

const res = validate(json);
if (!res.valid) {
  console.log(`VALIDATION ERRORS IN ${input}:`);
  res.errors.forEach((err) => {
    console.log('-', err.toString());
    console.log(`    ${JSON.stringify(err.instance, null, 2).split('\n').join('\n    ')}`);
  });
  process.exit(1);
}
