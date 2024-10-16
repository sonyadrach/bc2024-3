const fs = require('fs');
const { program } = require("commander");

program
  .option("-i,--input <path>")
  .option("-o,--output <path>")
  .option("-d,--display");
program.parse();

const options = program.opts();

if (!options.input) {
    console.error("Please, specify input file");
    process.exit(1);
}

if (!fs.existsSync(options.input)) {
    console.error("Cannot find input file");
    process.exit(1);
}

const r_data = fs.readFileSync(options.input, "utf8");
const data = JSON.parse(r_data);

if (data && Array.isArray(data)) {  
    const filteredData = data.filter(item => item.parent === "BS3_BanksLiab");

    if (filteredData.length === 0) {
        console.log("No data found for parent: BS3_BanksLiab");
    } else {
  
        const result = filteredData.map(item => `${item.txten}:${item.value}`).join('\n');

    if (options.display) {
        console.log(result);
    }

    if (options.output) {
        fs.writeFileSync(options.output, result);
        console.log(`Result written to ${options.output}`);
    }
}
}