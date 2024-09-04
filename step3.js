const fs = require('fs');
const axios = require('axios');


//function to handle output ( either print to console or write to output file)
function handleOutput(output, data) {
    //if --out flag is present
    if (output) {
        fs.writeFile(output, data, 'utf8', err => {
            if (err) {
                console.error(`Couldn't write to ${output}`)
                console.log(err)
                process.exit(1);
            }
        })
    } else {
        console.log(data);
    }
}

//function to read file with path and print it (or write to an output file)
function cat(path, output) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:`);
            console.log(err)
            process.exit(1)
        }
        //either print or write the data
        handleOutput(output, data);
    })
}

//async function to fetch content from url and print it (or write to an output file)
async function webCat(url, output) {
    try {
        let response = await axios.get(url)
        handleOutput(output, response.data)
    } catch (e) {
        console.error(`Error fetching ${url}: ${e}`)
        console.log(e)
        process.exit(1);
    }

}

let outputFile;
let path;

// check if --out is provided as the second argument
if (process.argv[2] === '--out') {
    outputFile = process.argv[3];
    path = process.argv[4];
} else {
    path = process.argv[2] // if no --out flag, just use original
}

if (path.startsWith('http')) {
    webCat(path, outputFile);
} else {
    cat(path, outputFile);
}
