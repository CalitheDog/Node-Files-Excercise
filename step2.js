const fs = require("fs");
const process = require("process");
const axios = require("axios");

// reads file at path, then prints it to console
function cat (path){
fs.readFile(path, "utf8", function(err,data){
    if(err){
        console.error(`Error reading ${path}: ${err}`);
        process.exit(1);
    } else {
        console.log(data);
    }
});
}



// reads page at url and prints to console

async function webCat(url){
    try {
        let resp = await axios.get(url);
        console.log(resp.data);
    } catch (err){
        console.error(`Error retrieving ${url}: ${err}`);
        process.exit(1);
    }
}

let path = process.argv[2];
if(path.slice(0,4) === "http"){
    webCat(path);
} else {
    cat(path);
}