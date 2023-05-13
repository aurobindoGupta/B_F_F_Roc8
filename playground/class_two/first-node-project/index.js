#!/usr/bin/env node

const { program } = require("commander");
const { translate } = require("@vitalets/google-translate-api");
program
  .usage("[text] [options]")
  .option("-t, --target <target-lang>")
  .option("-f, --from <from-lang>");

console.log("project running");
program.parse(process.argv);
const text = program.args.join(" ");

if (!text) {
  program.outputHelp();
  process.exit(1);
}

const options = program.opts();

const { from = "auto", target = 'en' } = options;

translate(text, {
  to: target,
  from,
})
  .then((response) => console.log(response.text))
  .catch((e) => console.error(e));

//* console.log({ options });
