/**
 * Created by charmi on 9/6/2017.
 */

//Function 1
console.log("Function 1: sumOfSquares");
function sumOfSquares(num1, num2, num3) {

    try{
    if(num1 == null || num2 == null || num3 == null  || num1 == undefined || num2 == undefined || num3 == undefined){
        throw "your input should not be empty. ";
    }
    else if (typeof num1 !== 'number' || typeof num2 !== 'number' || typeof  num3 !== 'number'){
        throw "Input should be numaric value.";
    }
    }catch(error){
    return error;
    }
    var a = num1*num1;
    var b = num2*num2;
    var c = num3*num3;
    var total = a + b + c;
    return total;
}

console.log(sumOfSquares()); //returns your input should not be empty.
console.log(sumOfSquares("a", 3, 10));// returns Input should be numaric value.
console.log(sumOfSquares(5,3,10)); // return when condition match result is 134
console.log("\n");
//Function 2
console.log("Function 2: sayHelloTo")
function sayHelloTo(firstName, lastName, title) {

    try{
    if(firstName == null && lastName == null && title == null){
        throw "Input string should not be empty";
    }
    else if(firstName == "" || lastName == "" || title == "" || firstName == " " || lastName == " " || title == " "){
        throw "Input string should be valid"
    }
    else if(typeof firstName !== 'string' || typeof lastName !== 'string' || typeof title !== 'string'){
        throw  "Input must be valid string, it is a number"
    }
    }catch(error){
        return error;
    }
if(firstName && lastName == null && title == null){
return "Hello, " + firstName + "!";
}
else if(firstName && lastName && title == null){
return "Hello, " + firstName + " " +lastName + ". I hope you are having a good day!";
}
else if(firstName && lastName && title){
return "Hello, " + title + " " + firstName + " " + lastName + "! Have a good evening!";
}
}
console.log(sayHelloTo()); //returns Input string should not be empty
console.log(sayHelloTo("")); //returns Input string should be valid
console.log(sayHelloTo(" ")); //returns input string is invalid
console.log(sayHelloTo(222)); //retruns Input must be valid string, it is a number
console.log(sayHelloTo("Phill"));
console.log(sayHelloTo("Phill", "Barresi"));
console.log((sayHelloTo("Phill", "Barresi", "Mr.")));
console.log("\n");
//Function 3
console.log("Function 3: cupsOfCoffee")
function cupsOfCoffee(num) {
    try{
    if(num == null){
        throw "Input number should not be empty";
    }
    else if(typeof num !== 'number'){
        throw "Input should be number";
    }
    else if(num<1){
        throw "Input number should be valid"
    }
    }catch(error){
        return error;
    }
for(var i = num; i>=1; i--){
if(i!==1){
    console.log(i + "cups of cofee on thr desk! " + i + "cups of coffee!");
    console.log("Pick one uo, drink the cup, " + (i-1) + "cups of coffee on the desk!");
}
else{
    console.log(i + "cups of cofee on thr desk! " + i + "cups of coffee!");
    console.log("Pick one uo, drink the cup, no more cups of coffee on the desk!");
}
}
}
console.log(cupsOfCoffee()); //returns Input number should not be empty
console.log(cupsOfCoffee("a")); //returns Input should be number
console.log(cupsOfCoffee(0)); //returns Input number should be valid
cupsOfCoffee(5);
console.log("\n");
//Function 4
console.log("Function 4: occurecesOfString");
function occurrencesOfSubstring(fullString, substring)
{
    try
    {
        if (fullString == null && substring == null)
        {
            throw "String shoul not be empty";
        }
        else if(fullString == "" ||substring == "" || fullString == " " ||substring == " ")
        {
            throw "String is not valid";
        }
        else if (typeof fullString !== 'string' || typeof substring !== 'string')
        {
            throw "String is not valid, it must be a proper string";
        }
    }
    catch(error)
    {
        return error;

    }
    var count = 0;
    for(var i = 0;  i < fullString.length; i++)
    {
        var s = fullString.substr( i , substring.length);

        if (s == substring)
        {
            count ++;
        }
    }
    return count;
}
console.log(occurrencesOfSubstring()); //returns String shoul not be empty
console.log(occurrencesOfSubstring(" ", "x")); //returns String is not valid
console.log(occurrencesOfSubstring(23562, 2)); // returns String is not valid, it is a number
console.log(occurrencesOfSubstring("hello world", "o"));
console.log(occurrencesOfSubstring("Helllllllo, class!" , "ll"));
console.log("\n");

//Function 5
console.log("Function 5: randomizeSentences");
function randomizeSentences(paragraph) {
    try {
        if (paragraph == null) {
            throw "Paragraph should not be empty"
        }
        else if (paragraph == "" || paragraph == " ") {
            throw "Input is not valid"
        }
        else if (typeof paragraph !== 'string') {
            throw "paragraph must be string"
        }
    } catch (error) {
        return error;
    }
    paragraph = " " + paragraph;
    var array = new Array();
    var count = 0;
    var oldindex = 0;

    for(var i=0; i<paragraph.length; i++){
    if(paragraph.charAt(i) == "!" || paragraph.charAt(i) == "." || paragraph.charAt(i) == "?"){
        array[count] = paragraph.substring(oldindex, (i+1));
        oldindex = i+1;
        count ++;
    }
    }
    for(var i = array.length - 1; i>=0; i--){
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    var x = array.join('');
    x = x.substring(1, x.length);
    return x;
}
var paragraph = "Hello, world! I am a paragraph. You can tell that I am a paragraph because there are multiple sentences that are split up by punctuation marks. Grammar can be funny, so I will only put in paragraphs with periods, exclamation marks, and question marks -- no quotations.";
console.log(randomizeSentences());// returns Paragraph should not be empty
console.log(randomizeSentences(" "));// returns Input is not valid
console.log(randomizeSentences(5656));// returns paragraph must be string
console.log(randomizeSentences(paragraph));
console.log("\n");


