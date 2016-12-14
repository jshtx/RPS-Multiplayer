
$(document).ready(function() {

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAq36bJUFfpdC2lcd7aEBLVmwFS7ObF1bM",
    authDomain: "first-firebase-project-4c0e5.firebaseapp.com",
    databaseURL: "https://first-firebase-project-4c0e5.firebaseio.com",
    storageBucket: "first-firebase-project-4c0e5.appspot.com",
    messagingSenderId: "527966632559"
  };
  firebase.initializeApp(config);

var database = firebase.database();



var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");
var playerRef = database.ref("/playerData");

var p1name = "Player 1";
var p2name = "Player 2";
var p1score = 0;
var p2score = 0;
var p1answer = "";
var p2answer = "";
var playNum;

playerRef.set({
        p1name: p1name,
        p2name: p2name,
        p1score: p1score,
        p2score: p2score,
        p1answer: p1answer,
        p2answer: p2answer
       });



connectedRef.on("value", function(snapshot) {
  if (snapshot.val()) {
    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});




connectionsRef.on("value", function(snapshot) {
  if (snapshot.numChildren() === 1){
   playNum = 1;
   
    
  }
  else if (snapshot.numChildren() === 2 && !playNum){
    playNum =2;
  }
});



 $("#name-button").on("click", function(e) {
  e.stopPropagation();
  		console.log(playNum);
      var username = $("#name-input").val().trim();

      console.log(username);
      if (playNum === 1) {
      	p1name = username;
       playerRef.update({
        p1name: p1name
      
       });
     }
     else if (playNum === 2){
      p2name = username;
      playerRef.update({
        p2name: p2name
    
       });

     }
      
   $ ("#submitName").css("visibility", "hidden");
   $ (".choices").show();
   
  return false;

    });

 //function that stores the choice that was made into the database
function choiceMade(choice){
	 if (playNum === 1) {
   
       playerRef.update({
        p1answer: choice
      
       });
     }
     else if (playNum === 2){
      
      playerRef.update({
        p2answer: choice
    
       });


     }

	
     results();

};

function results(){
	$ (".choice").hide()

	

      playerRef.on("value", function(snapshot) {
      	var finalAnswer1 = snapshot.val().p1answer;
      	
  		var finalAnswer2 = snapshot.val().p2answer;
 

  		if (((finalAnswer1 === "rock") || (finalAnswer1 === "paper") || (finalAnswer1 === "scissors"))
  			&& (finalAnswer2 === "rock") || (finalAnswer2 === "paper") || (finalAnswer2 === "scissors")) {
  			
  		

  		if ((finalAnswer1 === "rock") && (finalAnswer2 === "scissors")) {

            player1wins();
          }
          else if ((finalAnswer1 === "rock") && (finalAnswer2 === "paper")) {
            player2wins();
          }
          else if ((finalAnswer1 === "scissors") && (finalAnswer2 === "rock")) {
            player2wins();
          }
          else if ((finalAnswer1 === "scissors") && (finalAnswer2 === "paper")) {
            player1wins();
          }
          else if ((finalAnswer1 === "paper") && (finalAnswer2 === "rock")) {
            player1wins();
          }
          else if ((finalAnswer1 === "paper") && (finalAnswer2 === "scissors")) {
            player2wins();
          }
          else if (finalAnswer1 === finalAnswer2) {
            console.log("tie");
          }

      };
  		
  
// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

      return false;

};

function player1wins() {

			

			playerRef.on("value", function(snapshot) {
	

       $ (".choices").append(snapshot.val().p1name + " chose " + snapshot.val().p1answer);
       $ (".choices").append(snapshot.val().p2name + " chose " + snapshot.val().p2answer);
       $ (".choices").append(snapshot.val().p1name + "WINS!");
      

      

    // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    // Again we could have named errorObject anything we wanted.
    }, function(errorObject) {

      
      console.log("The read failed: " + errorObject.code);


    });

			p1score++;
            playerRef.update({
        		p1score: p1score
    
       		});

       		return false;
       		
       	//	endGame();
       		console.log("play1 win");

};

function player2wins() {


                   playerRef.on("value", function(snapshot) {
	

       $ (".choices").append(snapshot.val().p1name + " chose " + snapshot.val().p1answer);
       $ (".choices").append(snapshot.val().p2name + " chose " + snapshot.val().p2answer);
       $ (".choices").append(snapshot.val().p2name + "WINS!");
      

      

    // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    // Again we could have named errorObject anything we wanted.
    }, function(errorObject) {

      
      console.log("The read failed: " + errorObject.code);


    });

              p2score++;   
  
            playerRef.update({
        		p2score: p2score
    
       		});
       	
       		return false;
       		console.log("play2 win");
       	//	endGame();
};

// function endGame () {

//                   $(".choices").append("test");
//                   $(".choices").append(p2name + " chose " + finalAnswer2);
//                   $(".choices").append(p1name + " WINS!");
                  


// };

 //function for click of rock, paper, or scissors
 $(".choice").on("click", function() {
 	
    choiceMade(this.id);
 });
 


playerRef.on("value", function(snapshot) {
	

       $ ("#player1").html(snapshot.val().p1name + ": " + snapshot.val().p1score);
       $ ("#player2").html(snapshot.val().p2name + ": " + snapshot.val().p2score);
      

      

    // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    // Again we could have named errorObject anything we wanted.
    }, function(errorObject) {

      
      console.log("The read failed: " + errorObject.code);


    });



	return false;


});
