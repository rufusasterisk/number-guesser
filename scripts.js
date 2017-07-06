//Number Guesser scripts

//Define Variables and link to Page elements
  //links to page elements
  var guessInput = document.getElementById('guessField');   //Input Field
  var guessButtonInput = document.getElementById('guessButton');   //Guess Button
  var guessClearInput = document.getElementById('clearButton');  //Clear Button
  var guessResetInput = document.getElementById('resetButton');  //Reset Button
  var lastGuessDisplay = document.getElementById('lastGuess');   //Guessed Number Display
  var lastGuessResult = document.getElementById('response');   //Guess Result
  var levelUpMessage = document.getElementById('levelUp');  // Level up message
  var introText = document.getElementById('topText');  // text above number Guessed

//JS Variables
  var secretNumber;   //Secret Number
  var currentInputString;   // Current User Guess as input string
  var currentGuessInt;   // current UserGuess as integer
  var maxSize=100;  // Maximum secretNumber Size
  var minSize=0;  // Minimum secretNumber size
  var inSetup = true; // enable setup variable

//add Event Listeners
  //Guess Button Listener
  // guessButtonInput.addEventListener('click', analyzeGuess);
  guessButtonInput.addEventListener('click', leftTopButtonClick);
  //Clear Button Listener
  // guessClearInput.addEventListener('click', clearGuess);
  guessClearInput.addEventListener('click', rightTopButtonClick);
  //Reset Button Listener
  // guessResetInput.addEventListener('click', resetGuess);
  guessResetInput.addEventListener('click', centerBottomButtonClick);
  //Input entered Listener
  // guessInput.addEventListener('input', enableClear);
  guessInput.addEventListener('input', inputEntered);

//On Page Load
  rangeSetup();

//Define Functions
  function leftTopButtonClick(){
    if (inSetup){
      setMin();
    } else {
      analyzeGuess();
    }
  }
  function rightTopButtonClick(){
    if(inSetup){
      setMax();
    } else{
      clearGuess();
    }
  }
  function centerBottomButtonClick(){
    if(inSetup){
      startGame();
    } else{
      resetGuess();
    }
  }

//Guess Button Click
  function analyzeGuess(){
    currentInputString = guessInput.value;
    if (isNaN(currentInputString)){
      alert('You must enter a number');
    } else {
      currentGuessInt = parseInt(currentInputString);
      if (currentGuessInt<minSize || currentGuessInt>maxSize){ //check if the user entered a valid number
          alert('You must enter a number between '+ minSize + ' and ' + maxSize +'!'); //yell at the user for being silly
        }
      else {//continue analyzing the guessInput
          lastGuessDisplay.innerHTML = currentInputString; //Display current guess
          if (currentGuessInt == secretNumber){ //check if the guess is correct
            victory(); //Display VICTORY
          }
          else if (currentGuessInt < secretNumber){ //check if the guess is too low
            highLow("low") //display TOO SMOL
          }
          else if (currentGuessInt > secretNumber){
            highLow("high")  //display TOO big
          };
        };
      };
  };

//Clear Button Click
  function clearGuess(){
    guessInput.value = "";
    disableButtons();
  };

//Reset Button Click
  function resetGuess(){
    event.preventDefault();
    guessResetInput.disabled = true;
    guessInput.disabled = false;
    resetGuesserHTML();
    disableButtons();
  };

//Pick a secret number
  function pickSecretNumber(){
    secretNumber = Math.floor(Math.random()*(maxSize-minSize))+minSize;
    //check if it worked
    console.log(secretNumber);
  };

//Input Control function
  //Enables Clear button on Text entry, Disables Clear and Guess buttons when field is blank
  function inputEntered(){
    if (guessInput.value != ""){     //is the field not blank?
      enableButtons(); //on field is not blank, enable Clear and Guess buttons
    }
    else {     //on field is Blank, disable Clear and Guess buttons
      disableButtons();
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
    levelUpMessage.style.visibility = "visible";
    levelUpMessage.innerHTML = "Maximum increased by 10, Minimum decreased by 10."
  }

  function rangeSetup(){ //sets page up for range entry
    guessInput.placeholder = "Enter minimum or maximum";
    lastGuessDisplay.innerHTML = "=)"
    guessButtonInput.value = "Set Minimum";
    guessClearInput.value = "Set Maximum";
    guessResetInput.value = "Start Guessing!";
    introText.innerHTML = "Welcome to Number Guesser!";
    levelUpMessage.innerHTML = "Current Range: " + minSize + " to " + maxSize;
    levelUpMessage.style.visibility = "visible";
    lastGuessResult.innerHTML = "Change the random number range using the box and buttons.";
  }

  function setMin(){
    currentInputString = guessInput.value;
      if (isNaN(currentInputString)){
        alert("You must enter a number!")
      }
      else if (parseInt(currentInputString) > maxSize) {
        alert("Minimum must be smaller than Maximum!")
      }
      else {
        minSize = parseInt(currentInputString);
        levelUpMessage.innerHTML = "Current Range: " + minSize + " to " + maxSize;
        lastGuessDisplay.innerHTML = "=O"
      }
  }

  function setMax(){
    currentInputString = guessInput.value;
    if (isNaN(currentInputString)){
      alert("You must enter a number!")
    }
    else if (parseInt(currentInputString) < minSize){
      alert("Maximum must be bigger than Minimum! Current Minimum: " + minSize);
    }
    else {
      maxSize = parseInt(currentInputString);
      levelUpMessage.innerHTML = "Current Range: " + minSize + " to " + maxSize;
      lastGuessDisplay.innerHTML = "X)";
    }
  }

  function startGame(){    //setup page
    inSetup = false;
    guessResetInput.disabled = true;
    disableButtons();
    setupGuesser();
    resetGuesserHTML();

  }

  function disableButtons(){
    guessClearInput.disabled = true;
    guessButtonInput.disabled = true;
  }
  function enableButtons(){
    guessClearInput.disabled = false;
    guessButtonInput.disabled = false;
  }
  function resetGuesserHTML(){
    // levelUpMessage.innerHTML = "";
    lastGuessResult.innerHTML = "Enter a guess between " + minSize + " and " + maxSize + ".";
    lastGuessDisplay.innerHTML = "--";
    levelUpMessage.style.visibility = "hidden";
    //pick a new secret number
    pickSecretNumber();
  }
  function highLow(guessResult){
    lastGuessResult.innerHTML = "That is too " + guessResult;
  }
  function victory(){
    lastGuessResult.innerHTML = "BOOM!";
    guessResetInput.disabled = false;
    guessInput.setAttribute("disabled", true);
    disableButtons();
    increaseRange();
  }
  function setupGuesser(){ //change the HTML of the page to the Guesser layout
    guessInput.placeholder = "Enter your Guess";
    guessInput.value = "";
    guessButtonInput.value = "Guess";
    guessClearInput.value = "Clear";
    guessResetInput.value = "Reset";
    introText.innerHTML = "Your last guess was:";
  }
