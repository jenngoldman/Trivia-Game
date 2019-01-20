// Global Variables
var trivia = [{
    question: "In S1E1 'Pilot': Who started their first day at Dunder Mifflin Scranton?",
    possibleAnswers: ["Erin Hannon", "Daryll Philbin", "Jim Halpert", "Ryan Howard"],
    correctAnswer: 3
},
{
    question: "Where does Toby move to?",
    possibleAnswers: ["Panama", "Costa Rica", "Brazil", "Argentina"],
    correctAnswer: 1
},
{
    question: "Who does Michael hit with his car?",
    possibleAnswers: ["Creed", "Phyllis", "Meredith", "Dwight"],
    correctAnswer: 2
},
{   
    question: "What is the name of Robert California's wife?",
    possibleAnswers: ["Katie", "Susan", "Jill", "Rebecca"],
    correctAnswer: 1
},
{   question: "What is the name of the company David Wallace starts with his son?",
    possibleAnswers: ["Suck It", "Wallace and Son", "Music For Kids", "Kids of America"],
    correctAnswer: 0
},
{   question: "Where did Jim propose to Pam?",
    possibleAnswers: ["Niagra Falls", "Dunder Mifflin", "A gas station", "A parking lot"],
    correctAnswer: 2
}];

$(document).ready(function() {
    $("#start-button").on("click", function() {
        $("#start-button").hide();
        createTimer();
        buildTriviaHTML();
    })
})

function buildTriviaHTML() {
    for (i = 0; i < trivia.length; i++) {
                
        // Creates new div for each question/answer pair and adds to parent trivia div. 
        var triviaContainer = $("<div>");
        triviaContainer.addClass("trivia-container");
        $("#content-container").append(triviaContainer);

        // Creates question container and appends questions to trivia container.
        var questionContainer = $("<div>");
        questionContainer.addClass("trivia-question");
        questionContainer.text(trivia[i].question);
        triviaContainer.append(questionContainer);

        var possibleAnswerContainer = $("<div>");
        possibleAnswerContainer.addClass("possible-answers");
        triviaContainer.append(possibleAnswerContainer);

        // Creates a radio button for each possible answer.
        for (j = 0; j < trivia[i].possibleAnswers.length; j++) {
            var value = trivia[i].possibleAnswers[j];
            var radioBtn = $("<input type=radio>" + value + "<br>");
            radioBtn.attr("name", "group-" + i);
            radioBtn.attr("value", value);
            possibleAnswerContainer.append(radioBtn);  
        }           
    }
}

// Create timer and start countdown from 30 seconds.
function createTimer() {
    var timeRemaining = 20;
    timerContainer = $("<div>").text("Time Remaining: " + timeRemaining + " seconds");
    timerContainer.addClass("timer-container");
    $("#content-container").prepend(timerContainer);

    var gameTimer = setInterval(function(){
        if (timeRemaining === 0) {
            buildResultsHTML();
            clearInterval(gameTimer);
        }
        else {
            timeRemaining--;
            timerContainer.text("Time Remaining: " + timeRemaining + " seconds");
        }
    }, 1000);
}

// Tally correct, incorrect, unanswered and display in content-container.
function buildResultsHTML() {
    var correctAnswerCount = 0;
    var incorrectAnswerCount = 0;
    var unansweredCount = 0;
    
    // For loop checking each answer and adding it to corresponding variable. 
    for (i = 0; i < trivia.length; i++) {
        var buttonValue = $("input[name=group-" + i + "]:checked").val();
        var currentTrivia = trivia[i];
        if (!buttonValue) {
            unansweredCount++;
        } else if (buttonValue === currentTrivia.possibleAnswers[currentTrivia.correctAnswer]) {
            correctAnswerCount++;
        } else {
            incorrectAnswerCount++;
        }
    }

    timerContainer.text("Time's Up!");
    timerContainer.addClass("timer-container");
    correctAnswerContainer = $("<div>").text("Correct Answers: " + correctAnswerCount);
    correctAnswerContainer.addClass("correct-answer-container")
    incorrectAnswerContainer = $("<div>").text("Incorrect Answers: " + incorrectAnswerCount);
    incorrectAnswerContainer.addClass("incorrect-answer-container");
    unansweredContainer = $("<div>").text("Unanswered: " + unansweredCount);
    unansweredContainer.addClass("unanswered-container");

    $("#content-container").empty();
    $("#content-container").append(timerContainer);
    $("#content-container").append(correctAnswerContainer);
    $("#content-container").append(incorrectAnswerContainer);
    $("#content-container").append(unansweredContainer);

}