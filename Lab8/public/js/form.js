(function() {
  
  const staticForm = document.getElementById("static-form");
  const palindromeList = {};

  function isPalindrome(text){
    let mainText = text;
    let textArray = [];

    if (typeof text !== 'string') throw "Please Enter valid text to check";
    palindromeList[mainText] = -999;
    
    /* remove special characters, spaces and make lowercase*/
    var removeChar = text.replace(/[^0-9a-z]/gi, "").toLowerCase();

    /*convert all white spaces and tab in to a single spaces*/ 
    var removeChar = removeChar.replace(/\s+/g, "");
    

    /* reverse removeChar for comparison*/
    var checkPalindrome = removeChar.split('').reverse().join('');

    /* Check to see if str is a Palindrome*/
   if (removeChar === checkPalindrome){
    palindromeList[mainText] = 1;
    return "It's a palindrome.";
   }else{
    palindromeList[mainText] = 0;
    throw "It's not a palindrome.";
   }

  }

  if (staticForm) {
    // We can store references to our elements; it's better to
    // store them once rather than re-query the DOM traversal each time
    // that the event runs.
    const textAreaElement = document.getElementById("text");

    const errorContainer = document.getElementById("error-container");
    const errorTextElement = errorContainer.getElementsByClassName(
      "text-goes-here"
    )[0];

    const resultContainer = document.getElementById("result-container");
    const resultTextElement = resultContainer.getElementsByClassName(
      "text-goes-here"
    )[0];

    // We can take advantage of functional scoping; our event listener has access to its outer functional scope
    // This means that these variables are accessible in our callback
    staticForm.addEventListener("submit", event => {
      event.preventDefault();

      try {
        // hide containers by default
        errorContainer.classList.add("hidden");
        resultContainer.classList.add("hidden");

        const textValue = textAreaElement.value;
        if (textValue == "" || typeof textValue == "undefined" || typeof textValue == "null" ) {
          throw "Enter some aplha-numeric value!";
        }
        const result = isPalindrome(textValue);
        resultTextElement.textContent = result;
        resultContainer.classList.remove("hidden");
        
      } catch (e) {
        const message = typeof e === "string" ? e : e.message;
        errorTextElement.textContent = e;
        errorContainer.classList.remove("hidden");
      }

      let output = "";
      Object.keys(palindromeList).forEach(function(key) {
        if (palindromeList[key] == 1) {
          output = output + "<div class='is-palindrome'>" + key + "</div>";
        } else if (palindromeList[key] == 0) {
          output = output + "<div class='not-palindrome'>" + key + "</div>";
        }
      });
    
      $("#history").html(output);
      //console.log(output);
    });
  }
})();
