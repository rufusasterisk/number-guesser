//Number Guesser scripts

//Define Variables and link to Page elements
  //Input Field
    var guessInput = document.getElementById('guessField');
  //Guess Button
    var guessButtonInput = document.getElementById('guessButton');
  //Clear Button
    var guessClearInput = document.getElementById('clearButton');
  //Reset Button
    var guessResetInput = document.getElementById('resetButton');
  //Guessed Number Display
    var lastGuessDisplay = document.getElementById('lastGuess');
  //Guess Result
    var lastGuessResult = document.getElementById('response');
  //Secret Number
    var secretNumber;
  // Current User Guess as input string
    var currentGuessString;
  // current UserGuess as integer
    var currentGuessInt;
  // Maximum secretNumber Size
    var maxSize=100;
  // Minimum secretNumber size
    var minSize=0;
  // Level up message
    var levelUpMessage = document.getElementById('levelUp');

//On Page Load
  lastGuessResult.innerHTML = "Enter a guess between " + minSize + " and " + maxSize + ".";
  guessResetInput.disabled = true;
  guessClearInput.disabled = true;
  guessButtonInput.disabled = true;
  //pick the secret number on start
  pickSecretNumber();

//Define Event Listeners
  //Input Field doesn't need listener
  //Guess Button Listener
    guessButtonInput.addEventListener('click', analyzeGuess);
  //Clear Button Listener
    guessClearInput.addEventListener('click', clearGuess);
  //Reset Button Listener
    guessResetInput.addEventListener('click', resetGuess);
  //Input entered Listener
    guessInput.addEventListener('input', enableClear);

//Define Functions
  //Guess Button Click
  function analyzeGuess(){
    currentGuessString = guessInput.value;
    if (isNaN(currentGuessString)){
      alert('You must enter a number');
    } else {
      currentGuessInt = parseInt(currentGuessString);
      //check if the user entered a valid number
      if (currentGuessInt<minSize || currentGuessInt>maxSize){
          //yell at the user for being silly
          alert('You must enter a number between '+ minSize + ' and ' + maxSize +'!');
        } else {
          //continue analyzing the guessInput
          //Display current guess
          lastGuessDisplay.innerHTML = currentGuessString;
          //check if the guess is correct
          if (currentGuessInt == secretNumber){
            //Display VICTORY
            lastGuessResult.innerHTML = "BOOM!";
            guessClearInput.disabled = true;
            guessButtonInput.disabled = true;
            guessResetInput.disabled = false;
            guessInput.setAttribute("disabled", true);
            increaseRange();
            // alert('You win!');
          } else if (currentGuessInt < secretNumber){ //check if the guess is too low
            //display TOO SMOL
            lastGuessResult.innerHTML = "That is too low!";
            // alert('That guess is too low!');
          } else if (currentGuessInt > secretNumber){
            //display TOO big
            lastGuessResult.innerHTML = "That is too high!";
            // alert('That guess is too big!');
          };
        };
      };
  };

  //Clear Button Click
  function clearGuess(){
    guessInput.value = "";
    guessClearInput.disabled = true;
    guessButtonInput.disabled = true;
  };

  //Reset Button Click
  function resetGuess(){
    event.preventDefault();
    pickSecretNumber();
    guessInput.value = "";
    levelUpMessage.value = "";
    lastGuessResult.innerHTML = "Enter a guess between " + minSize + " and " + maxSize + ".";
    lastGuessDisplay.innerHTML = "--";
    guessResetInput.disabled = true;
    guessInput.disabled = false;
    guessButtonInput.disabled = true;
    levelUpMessage.innerHTML = "";
  };

  //Pick a secret number
  function pickSecretNumber(){
    secretNumber = Math.floor(Math.random()*(maxSize-minSize))+minSize;
    //check if it worked
    console.log(secretNumber);
  };

  //Input Control function
    //Enables Clear button on Text entry, Disables Clear and Guess buttons when field is blank
    //Checks if value entered is a number.
      //if it is a number, enable the Guess button
      //if it's not a number, disable the Guess button
  function enableClear(){
    console.log("enableClear running");
    //is the field not blank?
    if (guessInput.value != ""){
      //on field is not blank
      //enable the Clear button
      guessClearInput.disabled = false;
      // the 'is the value a number' section does not
      // display an error message on a text entry in lieu
      // of disabling the button. This does not meet guidelines
      // the below line of code enables the guess button
      // on any input to the field.
      guessButtonInput.disabled = false;
      //is the value a number?
      // if (!isNaN(guessInput.value)){
      //   //Yes a Number, enable guess button
      //   guessButtonInput.disabled = false;
      //   guessButtonInput.title = "";
      // }
      // else {
      //   //not a number, disable guess button
      //   guessButtonInput.disabled = true;
      //   guessButtonInput.title = "Enter a number to Guess";
      // }
      //on field is Blank
    } else {
      guessClearInput.disabled = true;
      guessButtonInput.disabled = true;
      guessButtonInput.title = "Enter a number to Guess";
    };
  };
  function increaseRange(){
    maxSize = maxSize+10;
    //add a function to prevent negatives
    // if (minSize-10 < 0){
    //   console.log("no Negatives!");
    //
    // }
    //decrease minimum size by 10
    minSize = minSize-10;
    //tell the user the change to the ranges (on reset the message says the range)
    levelUpMessage.innerHTML = "Maximum increased by 10, Minimum decreased by 10."
  }
