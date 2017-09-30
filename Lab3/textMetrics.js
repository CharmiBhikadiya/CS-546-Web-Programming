let textMetrics = exports = module.exports;

textMetrics.simplify = (text) => {
    
    if(text === undefined || typeof text !== 'string')
    throw ("Please, Enter Valid text");
    let resultText = text.toLowerCase();
   
    resultText = resultText.replace(/[^a-z0-9A-Z]/gi , ' ' ).replace(/\s+/g , ' ' ).replace(/^\s+|\s+$/gm,'').replace(/ +(?= )/g,'');
    return resultText;
}

textMetrics.createMetrics = (text) => {
    if(text == undefined || typeof text !== 'string')
     throw ("Please, Enetr valid text");

    let finalText = new Object();
    finalText.text = textMetrics.simplify(text);

    //totalLetters
    finalText.totalLetters = text.replace(/[^a-z0-9A-Z]/gi , "").length;

    //totalWords
    finalText.totalWords = text.trim().split(/\s+/).length;

    //averageWordLength
    finalText.averageWordLength = finalText.totalLetters/finalText.totalWords;

    //longWords, uniqueWords, WordOccurrences
    let wordOccurrences={};
    
     let wordArray = finalText.text.split(' ');
     finalText.longWords = 0;
     for(let i=0;i<wordArray.length;i++)
     {
        let word = wordArray[i];
        if(word.length > 5)
        finalText.longWords++;
        if(wordOccurrences[word]!==undefined) 
        {
            wordOccurrences[word]+=1;                
        } 
        else  
        {
            wordOccurrences[word]=1; 
        }                 
     } 
     finalText.uniqueWords = Object.keys(wordOccurrences).length;
     finalText.wordOccurrences = wordOccurrences;

     return finalText;
    
}
//console.log(textMetrics.createMetrics("Helllo, my -! This is a great day to say helllo.\n\n\tHelllo! 2 3 4 23 "));