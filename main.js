document.addEventListener('DOMContentLoaded', function() {
  const bird = document.querySelector('.bird');
  const gameDisplay = document.querySelector('.game-container'); // the gameDisplay div is the div that contains the bird and the obstacles
  const ground = document.querySelector('.ground-moving');

  let birdLeft = 220;
  let birdBottom = 300;
  let gravity = 4; // gravity is the rate at which the bird falls

  function startGame() {
    birdBottom -= 1.5; // the bird will fall at a rate of 4px per 20ms
    bird.style.bottom = birdBottom + 'px';
    bird.style.left = birdLeft + 'px';
  }
  let timerId = setInterval(startGame, 12);

  function control(e) { // control is the function that will be called when a key is pressed
    if(e.keyCode === 32) {
      jump(); // if the key pressed is the spacebar, then the jump function will be called
    }
  }

  function jump() {
    if(birdBottom < 500){ birdBottom += 88;} // if the bird is not at the top of the screen, then it will jump
    bird.style.bottom = birdBottom + 'px'; // the bird will be moved up by 50px
  }
  document.addEventListener('keyup', jump);

  function generateObstacle() {
    const obstacle = document.createElement('div'); // a new div is created
    obstacle.classList.add('obstacle'); // the obstacle class is added to the obstacle div
    gameDisplay.appendChild(obstacle); // the obstacle div is added to the gameDisplay div
    obstacle.style.left = obstacleLeft + 'px';
  }
  generateObstacle();
});