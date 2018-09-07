// var
var trivia = {
    initialScreen: "",
    correctCounter: 0,
    inCorrectCounter: 0,
    unAnsweredCounter: 0,
    
    gameHTML: "",
    questionsArray: [
                    "What does O.W.L. stand for?", "Who was Dumbledore's immediate predecessor as Headmaster or Headmistress at Hogwarts?", "Where do Harry's aunt and uncle live?", "Who is Ginny's first boyfriend?", "Who destroyed the last remaining Horcrux?"],
    answerArray: [
                  ["Official Wizarding Licence", "Ordinary Wizarding Level", "Organised Wizard Learning", "Outstanding Wizard Lesson"], ["Phineas Nigellus Black", "Dexter Fortescue", "Armando Dippet", "Dilys Derwent "], ["Little Hangleton", "Little Whinging", "Hogsmeade", "Godric's Hollow"], ["Michael Corner", "Zacharias Smith", "Harry Potter", "Dean Smith"], ["Neville Longbottom", "Harry Potter", "Ron Weasley", "Hermoine"],],
    correctAnswers: [
                    "B. Ordinary Wizarding Level ", "C. Armando Dippet", "B.Little Whinging", "A. Michael Corner", "A. Neville Longbottom"],
    
    clock: "",
    questionCounter: 0,
    timeCounter: 20,
  };
  
  
  //FUNCTIONS
  
  function startScreen(){
    //Create the start button
    trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Start!</a></p>";
    
    $(".main-area").html(trivia.initialScreen);
  };
  
  function timer(){
    trivia.clock = setInterval(twentySeconds, 1000);
    function twentySeconds(){
      if(trivia.timeCounter === 0){
        timeOutLoss();
        clearInterval(trivia.clock);
      }
      if(trivia.timeCounter > 0) {
        trivia.timeCounter --;
      }
      $(".timer").html(trivia.timeCounter);
    }
  };
  
  function wait(){
    if(trivia.questionCounter < 4) {
      trivia.questionCounter ++;
      generateHTML();
      trivia.timeCounter = 20;
      timer();
    }
    else {
      finalScreen();
    }
  };
  
  function win(){
    trivia.correctCounter ++;
    trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter]+ "</p>";
    $(".main-area").html(trivia.gameHTML);
    setTimeout(wait, 2000);
  };
  
  function loss(){
    trivia.inCorrectCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ trivia.correctAnswers[trivia.questionCounter]+"</p>";
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 2000);
  };
  
  function timeOutLoss(){
    trivia.unAnsweredCounter ++;
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter]+ "</p>";
      $(".main-area").html(trivia.gameHTML);
      setTimeout(wait, 2000);
  };
  
  function finalScreen(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Well done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
    $(".main-area").html(trivia.gameHTML);
  };
  
  function resetGame(){
    trivia.questionCounter = 0;
    trivia.correctCounter = 0;
    trivia.inCorrectCounter = 0;
    trivia.unAnsweredCounter = 0;
    trivia.timeCounter = 20;
    generateHTML();
    timer();
  };
  
  function generateHTML(){
    trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. "+trivia.answerArray[trivia.questionCounter][1]+"</button><br><button class='answer'>C. "+trivia.answerArray[trivia.questionCounter][2]+"</button><br><button class='answer'>D. "+trivia.answerArray[trivia.questionCounter][3]+"</button>";
    $(".main-area").html(trivia.gameHTML);
  }
  
  
  //MAIN PROCESS
  
  startScreen();
  
  //start-button click
  $("body").on("click", ".start-button", function(event){
      event.preventDefault();
      
      generateHTML();
  
      timer();
  }); 
  
  $("body").on("click", ".answer", function(event){
      
    //If correct answer
    selectedAnswer = $(this).text();
      if(selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {
  
          clearInterval(trivia.clock);
          win();
      }
    //If incorrect ansewr
      else {
  
          clearInterval(trivia.clock);
          loss();
      }
  }); 
  
  //reset-button click
  $("body").on("click", ".reset-button", function(event){
      
      resetGame();
  }); 