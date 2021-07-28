import { update as updateSnake, draw as drawSnake, SNAKE_SPEED, getSnakeHead, snakeIntersection, score, resetGame } from "./snake.js"
import { update as updateFood, draw as drawFood } from './food.js'
import { outsideGrid } from './grid.js'


let lastRenderTime = 0
export let gameOver = false
export const gameBoard = document.getElementById('game-board')
let newName
export let isGameReset = false

function gameLoop(timeStamp) {

    if(gameOver) {
        addName2Board()
        
        if(confirm('Game Over! Press ok to play again, press cancel to go back to the lobby.')) {
            resetGame();
            isGameReset = true
            return gameOver = false;
        }
        alert('Hope you had fun! See ya next time.')
        return window.location = '../index.html'
    }


    window.requestAnimationFrame(gameLoop)

    const secondsSinceRender = (timeStamp - lastRenderTime) / 1000
    if(secondsSinceRender < 1 / SNAKE_SPEED) {
        return
    }

    lastRenderTime = timeStamp
    
    update()
    draw()

}

$('.start').click(function() {
    window.requestAnimationFrame(gameLoop)

    window.addEventListener('keydown', function(event) {
        switch (event.key) {
            case 'ArrowUp':
                isGameReset = false
                break
            case 'ArrowDown':
                isGameReset = false
                break
            case 'ArrowLeft':
                isGameReset = false
                break
            case 'ArrowRight':
                isGameReset = false
                break
        
        }
    })


})

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

function addName2Board() {
    newName = prompt('Nice job! Type in your name below')

    let makeLi = document.createElement('li')
    let listClass = document.getElementById('list')
    let fillLi = document.createTextNode(newName + ':  ' + score)


    makeLi.appendChild(fillLi)
    listClass.appendChild(makeLi)
}