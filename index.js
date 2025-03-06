const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
    .option('-i, --input <path>', 'шлях до вхідного файлу')
    .option('-o, --output <path>', 'шлях до вихідного файлу')
    .option('-d, --display', 'виводити результат в консоль')
    .parse(process.argv);

const options = program.opts();

if (!options.input) 
{
    console.error('Please, specify input file');
    process.exit(1);
}

if (!fs.existsSync(options.input)) 
{
    console.error('Cannot find input file');
    process.exit(1);
}

try
{
    const data = fs.readFileSync(options.input, 'utf8');
    const parsedData = JSON.parse(data);
  
    const result = JSON.stringify(parsedData, null, 2);
  
    if (options.output) fs.writeFileSync(options.output, result);
  
    if (options.display) console.log(result);
  
}
catch (error) 
{
    console.error('Error processing file:', error.message);
    process.exit(1);
}
