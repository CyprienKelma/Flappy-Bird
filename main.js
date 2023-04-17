document.addEventListener('DOMContentLoaded', function() {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container'); // the gameDisplay div is the div that contains the bird and the obstacles
  const ground = document.querySelector('.ground-moving');

  let birdLeft = 220;
  let birdBottom = 320; 
  let isGameOver = false;
  let gap = 448;
  
  let jumpAudio = new Audio("Ressources/wing.wav");

  function startGame() {
    birdBottom -= 1.7; // the bird will fall at a rate of 4px per 20ms
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';
  }
  var gameTimerId = setInterval(startGame, 12);

  function control(e) { // control is the function that will be called when a key is pressed
    if(e.keyCode === 32) {
      jump(); // if the key pressed is the spacebar, then the jump function will be called
    }
  }

  function jump() {
    if(birdBottom < 500) { // if the bird is not on top
      birdBottom += 70; // then jump
    }
    bird.style.bottom = birdBottom + 'px'; // the bird will be moved up by 50px
  }
  document.addEventListener('keyup', control);

  function generateObstacle() {
    let obstacleLeft = 500; // the obstacle will be generated at the right edge of the screen
    let randomHeight = Math.random() * 60;
    let obstacleBottom = randomHeight; // the obstacle will be generated at a random height

    const obstacle = document.createElement('div'); // a new div is created
    const topObstacle = document.createElement('div');

    if(!isGameOver){
      obstacle.classList.add('obstacle'); // the obstacle class is added to the obstacle div
      topObstacle.classList.add('topObstacle');
    }
    gameDisplay.appendChild(obstacle); // the obstacle div is added to the gameDisplay div
    gameDisplay.appendChild(topObstacle);

    obstacle.style.left = obstacleLeft + 'px';
    obstacle.style.bottom = obstacleBottom + 'px';
    topObstacle.style.left = obstacleLeft + 'px';
    topObstacle.style.bottom = obstacleBottom + gap + 'px';

    function moveObstacle(){
      obstacleLeft -= 2;
      obstacle.style.left = obstacleLeft + 'px';
      topObstacle.style.left = obstacleLeft + 'px';

      if(obstacleLeft === -60){
        clearInterval(timerId);
        gameDisplay.removeChild(obstacle);
        gameDisplay.removeChild(topObstacle);
      }
      if(obstacleLeft > 200 && obstacleLeft < 280 && birdLeft === 220 && 
        (birdBottom < obstacleBottom + 153 || birdBottom > obstacleBottom + gap - 200
        || birdBottom === 0)){
        gameOver();
        clearInterval(timerId);
      }
    }
    let timerId = setInterval(moveObstacle, 20);
    if(!isGameOver) setTimeout(generateObstacle, 2950);
  }
  generateObstacle();

  function gameOver(){
    clearInterval(gameTimerId);
    isGameOver = true;
    document.removeEventListener('keyup', control);
  }
  


});