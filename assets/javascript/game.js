

//  initialize global variables here
    var winCtr = 0;
    var lossCtr = 0;
    var winWords =[];
    var lossWords = [];
    initStats();

    mysteryWord = getMysteryWord();
    runningGuess = "";       
    for (var i = 0; i < mysteryWord.length; i++) {
        guessWordarray.push("_");
        runningGuess = runningGuess + guessWordarray[i] + " ";
    }

    statDisplay();

//function mainfunction()
document.onkeypress = function(event)
{
    if (attemptCtr == 0 || hitCtr == mysteryWord.length) {     // game reset 
               
      if (attemptCtr == 0) {
        $("<span>" + lossWords[lossCtr] + "</span><br>").appendTo("#lossList");
        lossCtr += 1;
      }
      if (hitCtr == mysteryWord.length) {
        $("<span>" + winWords[winCtr] + "</span><br>").appendTo("#winList");
        winCtr += 1;
      }

      initStats();
      mysteryWord = getMysteryWord();
      runningGuess = "";       
      for (var i = 0; i < mysteryWord.length; i++) {
         guessWordarray.push("_");
         runningGuess = runningGuess + guessWordarray[i] + " ";
      }

      statDisplay();
      return;

    } 

//---------   Magic starts here  ----------------

  var x = event.keyCode;
    var key = String.fromCharCode(x);
        key = key.toUpperCase();

//---------  Validate key entered, should be alphabetic -------
    if (( x > 64 && x < 91) || (x > 96 && x < 123 )) 
        {
        //  console.log(x + " is valid");  continue
        } else {return;}

//--------- key is valid but check if already pressed -----
    var gLen = guesses.push(key);
    var limit = gLen - 1;
    for (var i = 0; i < limit; i++) {
        if (key == guesses[i]) {
            guesses.pop();
            return;                         // duplicate letter guess
        }
    };

//--------- At this point, key is qualified to be evaluated -----
    t += 1;
    message = " ";
    runningGuess = "";
    matchedFlag = "n";

    for (var i = 0; i < mysteryWord.length; i++) {
        if (key == mysteryWord.substr(i,1)) {   
            hitCtr += 1;                    // count the hits
            matchedFlag = "y";
            guessWordarray[i] = key;
        } 
        runningGuess = runningGuess + guessWordarray[i] + " ";
    }

    if (matchedFlag == "n") {               // count the misses, chance remaining
        missCtr += 1;
        attemptCtr -= 1;
    }  

    if (t == 1) {reveal = key;}             // did not use array to store guesses
    else {reveal = reveal + " , " + key;}

    if (attemptCtr == 0) {
        lossWords.push(mysteryWord);
        message = " * * GAME OVER * *";
        reveal = mysteryWord;
    }
    if (hitCtr == mysteryWord.length) {      
        winWords.push(mysteryWord);
        message = "*** " + winWords.length + "-Time Winner!  * *";
    } 

    statDisplay();

};

//---------   Functions --------------------

function initStats() {
    t = 0;
    hitCtr = 0;
    missCtr = 0;
    attemptCtr = 7;
    reveal = " ";
    mysteryWord = " ";
    guessWordarray = [];
    guesses = [];
    runningGuess = "_ _ _ _ _ _ _ _ _ _";
    message = " ";
}

function statDisplay() {
      
    document.getElementById("word").innerHTML = runningGuess;   
    document.getElementById("win").innerHTML = "Win: " + winCtr;
    document.getElementById("loss").innerHTML = "Loss: " + lossCtr;
    document.getElementById("attempt").innerHTML = "Guess: " + attemptCtr;
    document.getElementById("guess").innerHTML = reveal;
    document.getElementById("msgLine").innerHTML = message;  
}

function getMysteryWord(){
    var dictionary = [
        "HANGMAN",
        "ELEMENT",
        "CLASS",
        "OBJECT",
        "VARIABLE",         // 5
        "DOCUMENT",
        "FUNCTION",
        "CONCATENATE",
        "ARGUMENT",
        "PARAMETER",        //10
        "ITERATION",
        "LOOP",
        "GAME",
        "EXERCISE",
        "ATTENDANCE",       //15
        "BREAK",
        "SCRIPT",
        "CODE",
        "PROGRAM",
        "ATTRIBUTE",         //20
        "OPERAND",
        "OPERATOR",
        "ARRAY",
        "JAZZ",
        "ASSIGNMENT",         //25
        "SCOPE",
        "MATH",
        "STRING",
        "RANDOM",
        "QUERY",               //30
        "PROPERTY",
        "DELIMITER",
        "RETURN",
        "BUTTON",
        "LINK",                 //35
        "SOURCE",
        "INTERNAL",
        "EXTERNAL",
        "EVENT",
        "SYNTAX"                //40
        ];

    var z = Math.floor((Math.random() * 24) + 0);

    return dictionary[z];
};
