const fs = require("fs");
const process = require("process");
const axios = require("axios");
let path;
let out;

// handles the outpus, writes to file else prints to console
function argHandler(text, out){
    if(out){
        fs.writeFile( out, text, "utf8", function(err){
            if(err){
                console.error(`Couldn't Write ${out}: ${err}`);
                process.exit(1);
            }
        });
    } else {
        console.log(text);
    }
}



// reads file at path, then prints it to console
function cat (path, out){
fs.readFile(path, "utf8", function(err,data){
    if(err){
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
    } else {
        argHandler(data, out);
    }
});
}



// reads page at url and prints to console

async function webCat(url, out){
    try {
        let resp = await axios.get(url);
        argHandler(resp.data, out);
    } catch (err){
        console.error(`Error retrieving ${url}: ${err}`);
        process.exit(1);
    }
}



if (process.argv[2] === '--out') {
    out = process.argv[3];
    path = process.argv[4];
  } else {
    path = process.argv[2];
  }
  
  if (path.slice(0, 4) === 'http') {
    webCat(path, out);
  } else {
    cat(path, out);
  }