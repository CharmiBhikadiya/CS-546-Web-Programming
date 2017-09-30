const fileData = require("./fileData");
const textMetrics = require("./textMetrics");
const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));


async function main(path)
{
    if(!path || path === undefined || typeof path !== 'string')
    {
        throw 'Please provide valid file path.';
    }
    let filename = path.substring(0,path.lastIndexOf('.'));
    let resultJsonFile = filename.concat("result.json");
    let isExist = await fs.existsSync(resultJsonFile);
    if(isExist)
    {
        let jsonFileObject = await fileData.getFileAsJSON(resultJsonFile);
        console.log(jsonFileObject);
      
        
    }
    else
    {
        let fileContent = await fileData.getFileAsString(path);
        let simplifytext = textMetrics.simplify(fileContent);
        await fileData.saveStringToFile(filename+'.debug.txt',simplifytext);
        let jsonObject = textMetrics.createMetrics(simplifytext);
        await fileData.saveJSONToFile(filename+'.result.json',jsonObject);
        console.log(jsonObject);
        
        
    }
}

async function start()
{
    try{
        await main('./chapter3.txt');
    }catch(e){
        console.log(e);
    }
    try{
        await main('./chapter2.txt');
    }catch(e){
        console.log(e);
    }
    try{
        await main('./chapter1.txt');
    }catch(e){
        console.log(e);
    }

}

start();
