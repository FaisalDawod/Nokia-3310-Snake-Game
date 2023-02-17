document.addEventListener('DOMContentLoaded', () => {
  //Decleration
  const squares = document.querySelectorAll('.grid div')
  const scoreDisplay = document.querySelector('span')
  const startBtn = document.querySelector('.start')

  const width = 10
  let currentIndex = 0 
  let appleIndex = 0 
  let currentSnake = [2,1,0] 
  let direction = 1
  let score = 0
  let speed = 0.9
  let intervalTime = 0
  let interval = 0


  //To start, and restart the game
  function startGame() {
    currentSnake.forEach(index => squares[index].classList.remove('snake'))
    squares[appleIndex].classList.remove('apple')
    clearInterval(interval)
    score = 0
    randomApple()
    direction = 1
    scoreDisplay.innerText = score
    intervalTime = 1000
    currentSnake = [2,1,0]
    currentIndex = 0
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    interval = setInterval(moveOutcomes, intervalTime)

    console.log("StartGame Function")
  }


  //Function that deals with ALL the ove outcomes of the Snake
  function moveOutcomes() {

    //Deals with snake hitting border and snake hitting self
    if (
      (currentSnake[0] + width >= (width * width) && direction === width ) || //If snake hits bottom
      (currentSnake[0] % width === width -1 && direction === 1) || //If snake hits right wall
      (currentSnake[0] % width === 0 && direction === -1) || //If snake hits left wall
      (currentSnake[0] - width < 0 && direction === -width) ||  //If snake hits the top
      squares[currentSnake[0] + direction].classList.contains('snake') //If snake goes into itself
    ) {
      console.log("moveOutcome Function in the first condition")
      return clearInterval(interval) //This will clear the interval if any of the above happen
    }

    const tail = currentSnake.pop() //Removes last ite of the array and shows it
    squares[tail].classList.remove('snake')  //Removes class of snake from the TAIL
    currentSnake.unshift(currentSnake[0] + direction) //Gives direction to the head of the array

    //Deals with snake getting apple
    if(squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake')
      currentSnake.push(tail)
      randomApple()
      score++
      scoreDisplay.textContent = score
      clearInterval(interval)
      intervalTime = intervalTime * speed
      interval = setInterval(moveOutcomes, intervalTime)

      console.log("moveOutcome Function in the second condition")
    }
    squares[currentSnake[0]].classList.add('snake')
    console.log("moveOutcome Function End")
  }


  //Generate new apple once apple is eaten
  function randomApple() {
    do{
      console.log("randomApple Function loop")
      appleIndex = Math.floor(Math.random() * squares.length)
    } while(squares[appleIndex].classList.contains('snake')) //making sure apples dont appear on the snake
    squares[appleIndex].classList.add('apple')
    console.log("randomApple Function")
  }


  //Assign functions to keycodes
  function control(e) {
    squares[currentIndex].classList.remove('snake')

    if(e.keyCode === 39) {
      console.log("Control Function --> RIGHT ARROW")
      direction = 1 //if we press the right arrow on our keyboard, the snake will go right one
    } else if (e.keyCode === 38) {
      console.log("Control Function --> UP ARROW")
      direction = -width // if we press the up arrow, the snake will go back ten divs, appearing to go up
    } else if (e.keyCode === 37) {
      console.log("Control Function --> LEFT ARROW")
      direction = -1 // if we press left, the snake will go left one div
    } else if (e.keyCode === 40) {
      console.log("Control Function --> DOWN ARROW")
      direction = +width //if we press down, the snake head will instantly appear in the div ten divs from where you are now
    }

    console.log("Control Function")
  }

  document.addEventListener('keyup', control)
  startBtn.addEventListener('click', startGame)
})