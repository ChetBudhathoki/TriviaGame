$(document).ready(function () {
    var options = [
        {
            question: "What is the largest country in the world?", 
            choice: ["China", "United States of America", "Russia", "India"],
            answer: 2,
            photo: "assets/images/russiaLargestCountry.jpeg"
         },
         {
            question: "What is the tallest mountain in the world?", 
            choice: ["Mount Fuji", "King\'s Peak", "Mount Everest", "Mount Kilimanjaro"],
            answer: 2,
            photo: "assets/images/tallestMountainEverest.jpeg"
         }, 
         {
            question: "What is the smallest country in the world?", 
            choice: ["Maldives", "Vatican City", "Monaco", "Marshall Island" ],
            answer: 1,
            photo: "assets/images/smallestCountryVatican.jpeg"
        }, 
        {
            question: "What is the most populous country in the world?", 
            choice: ["India", "Canada", "Brazil", "China" ],
            answer: 3,
            photo: "assets/images/mostPopulousCountryChina.jpeg"
        }, 
        {
            question: "What is the longest river by length in the world?", 
            choice: ["Mississippi", "Nile", "Bagmati", "Amazon" ],
            answer: 1,
            photo: "assets/images/longestRiverNile.jpeg"
        }, 
        {
            question: "What is the largest animal in the world?", 
            choice: ["African Elephant", "Blue Whale", "Brown Bear", "Squarrel" ],
            answer: 1,
            photo: "assets/images/largestAnimalBlueWhale.jpeg"
        }, 
        {
            question: "What is the largest tree in the world?", 
            choice: ["Pine Tree", "Sequoia", "Banyan Tree", "Bamboo" ],
            answer: 1,
            photo: "assets/images/largestTreeSequoia.jpeg"
        }, 
        {
            question: "What is the largest waterfall in the world?", 
            choice: ["Iguazu Falls", "Victoria Falls", "Niagara Falls", "Kaieteur Falls" ],
            answer: 0,
            photo: "assets/images/largestWaterfallIguazu.jpeg"
        }];
    
    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 20;
    var intervalId;
    var userGuess ="";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];
    
    
    
    $("#reset").hide();
    //click start button to start game
    $("#start").on("click", function () {
            $("#start").hide();
            displayQuestion();
            runTimer();
            for(var i = 0; i < options.length; i++) {
        holder.push(options[i]);
    }
        })
    //timer start
    function runTimer(){
        if (!running) {
        intervalId = setInterval(decrement, 1 * 1000); 
        running = true;
        }
    }
    //timer countdown
    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        //stop timer if reach 0
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }	
    }
    
    //timer stop
    function stop() {
        running = false;
        clearInterval(intervalId);
    }
    //randomly pick question in array if not already shown
    //display question and loop though and display possible answers
    function displayQuestion() {
        //generate random index in array
        index = Math.floor(Math.random()*options.length);
        pick = options[index];
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(var i = 0; i < pick.choice.length; i++) {
                var userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
                //assign array position to it so can check answer
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    //		}
    }
    
    
    //click function to select answer and outcomes
    $(".answerchoice").on("click", function () {
        //grab array position from userGuess
        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        //correct guess or wrong guess outcomes
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hidepicture();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    })
    }
    
    
    function hidepicture () {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        //run the score screen if all questions answered
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's the detail: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3 * 1000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })