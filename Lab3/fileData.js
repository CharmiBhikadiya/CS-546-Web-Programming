const bluebird = require("bluebird");
const fs = bluebird.promisifyAll(require("fs"));
let fileData = exports = module.exports;

fileData.getFileAsString = async (path) => {
    if (!path)
        throw ("No path provided");
    
     const fileResult = await fs.readFileSync(path, "utf-8")
         //   console.log(data.toString());
            return fileResult;
            // console.log(typeof(data));
};

fileData.getFileAsJSON = async (path) => {
    if (!path)
        throw ("No path provided");
    if (typeof path !== 'string')
        throw ("Not valid file path provided");

    const fileResult = await fs.readFileSync(path, "utf-8")
    let result=JSON.parse(fileResult);
    return result;   
      
}

fileData.saveStringToFile = async (path, text) => {

    if (!path)
        throw("No path provided");
    if (typeof path !== 'string')
        throw("Not valid path provided");
    if (!text)
        throw("No text enetred to save");
  

    const fileResult = await fs.writeFile(path, text, (error, data) => {
       
           // console.log('text'+ text +' is saved inside the file'+ path + 'successfully.');
        
        
    });
}

fileData.saveJSONToFile = async (path, obj) => {
    if (!path)
        throw("No path provided");
    if (typeof path !== 'string')
        throw("Not valid path provided");
    if (!obj)
        throw("No object enetred");
    
    const fileResult = await fs.writeFile(path, JSON.stringify(obj, null, 4), (error, data) => {
       
           // console.log('object is converted in string and saved inside the file '+ path + ' successfully.');
    });
    
}


