var buttonColour = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var startedToggle = false;
var level = 0;

// Leo los click hechos por el mouse
$(".btn").click(function () {
  userChosenColor = $(this).attr("id"); //indentifico los click que pertecen a los id de los botones
  userClickedPattern.push(userChosenColor); // registro en un arreglo los id presionados consecutivamente
  playSound(userChosenColor); //llamo a la funcion que reproduce el sonido
  animatePress(userChosenColor); // llamo a la funcion que anima los cuadros
  checkAnswer(userClickedPattern.length - 1); // llamo a la funcion de comprobacion de respuesta
});

$(document).keydown(function () {
  // inicializo el juego presionando cualquier boton
  if (startedToggle === false) {
    nextSecuence();
    $("#level-title").text("Level " + level);
    startedToggle = true; // el juego solo se inicializa una vez cuando se presiona un boton
  }
});

function nextSecuence() {
  // funcion que determina la secuencia del juego en forma aleatoria
  userClickedPattern = []; // una vez comprobado el primer patron, se vacia el arreglo que acomoda las respuestas del click
  var randomNumber = Math.random() * 4;
  randomNumber = Math.floor(randomNumber); //numeros aleatoriso del 0-3
  var randomChosenColour = buttonColour[randomNumber]; // cada numero aleatorio determina una posicion del arreglo de colores
  gamePattern.push(randomChosenColour); // acomo en un arreglo la secuencia de colores del juego
  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100); // Animacion de parpadeo del boton que realiza la secuencia
  playSound(randomChosenColour);
  level++; // si es correcto el patron realizado por el click, aumento el nivel
  $("#level-title").html("Level " + level); // cambio el titulo del nivel
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // reproduzco el sonido de cada cuadro
  audio.play;
}

function animatePress(currentColour) {
  // animacion cuando se presiona cada cuadro
  $("#" + currentColour).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
//verficacion de respuesta del juego
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    //compruebo cada posicion de la cadena de secuencia
    // con la cadena de respuesta del click,
    console.log("succes");
    if (gamePattern.length === userClickedPattern.length) {
      // compruebo el tamaño de ambas cadenas para pasar a la proxima secuencia
      setTimeout(function () {
        nextSecuence();
      }, 1000); //
    }
  } else {
    // si el valor es diferente en una posicion, game over
    console.log("wrong");
    var audioWrong = new Audio("sounds/wrong.mp3");
    audioWrong.play;
    $("body").addClass("game-over"); //añado un fondo rojo cuando se termina el juego al equivocarse
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200); // elimino el fondo rojo y vuelvo al fondo predeterminado del cuerpo
    $("h1").html("Game Over, Press Any  key to Restart"); //reinicio todos los valores del juego
    startOver();
  }
}
function startOver() {
  // reinicio todos los valores del juego
  startedToggle = false;
  level = 0;
  gamePattern = [];
}
