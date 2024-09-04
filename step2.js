const fs = require('fs');
const axios = require('axios');

//function to read file with path and print it
function cat(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading ${path}:`);
            console.log(err)
            process.exit(1)
        }
        console.log(data)
    })
}

//async function to fetch content from url and print it
async function webCat(url) {
    try {
        let response = await axios.get(url)
        console.log(response.data)
    } catch (e) {
        console.error(`Error fetching ${url}: ${e}`)
        console.log(e)
        process.exit(1);
    }

}

//if file path, use cat, else if URL , use webCat
let path = process.argv[2]

if (path.startsWith('http')) {
    webCat(path)
} else {
    cat(path)
}