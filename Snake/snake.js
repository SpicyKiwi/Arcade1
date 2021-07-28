import { getInputDirection } from "./input.js";
import { gameBoard } from "./app.js";


export let SNAKE_SPEED = 5
let snakeBody = [{x: 10, y: 10}]
let newBodyParts = 0
export let score = 0
let currentScore = $('.score')

$('.easy').click(function() {
    SNAKE_SPEED = 5;
    $('.easy').css('background-color', 'rgb(6, 94, 94)')
    $('.normal').css('background-color', 'teal')
    $('.hard').css('background-color', 'teal')
    return
})

$('.normal').click(function() {
    SNAKE_SPEED = 10;
    $('.easy').css('background-color', 'teal')
    $('.normal').css('background-color', 'rgb(6, 94, 94)')
    $('.hard').css('background-color', 'teal')
    return
})

$('.hard').click(function() {
    SNAKE_SPEED = 15;
    $('.easy').css('background-color', 'teal')
    $('.normal').css('background-color', 'teal')
    $('.hard').css('background-color', 'rgb(6, 94, 94)')
    return
})

export function update() {
    addBodyParts()

    const inputDirection = getInputDirection()

    for(let i = snakeBody.length - 2; i>=0; i--) {
        snakeBody[i + 1] = {...snakeBody[i]}
    }


    snakeBody[0].x += inputDirection.x
    snakeBody[0].y += inputDirection.y
}

export function draw(gameBoard) {
    snakeBody.forEach(bodyPart => {

        const snakeElement = document.createElement('div')

        snakeElement.style.gridRowStart = bodyPart.y
        snakeElement.style.gridColumnStart = bodyPart.x

        snakeElement.classList.add('snake')

        gameBoard.appendChild(snakeElement)

    })
}

export function expandSnake(amount) {
    newBodyParts += amount
    score += amount
    currentScore.text(score)
}

export function onSnake(position, {ignoreHead = false} = {}) {
    return snakeBody.some((bodyPart, index) => {
        if(ignoreHead && index === 0) return false
        return equalPositions(bodyPart, position)
    })
}

export function getSnakeHead() {
    return snakeBody[0]
}

export function snakeIntersection() {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

function equalPositions(pos1, pos2) {
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function addBodyParts() {
    for(let i = 0; i < newBodyParts; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }

    newBodyParts = 0
}

export function resetGame() {
    snakeBody = [{x: 10, y: 10}]
    newBodyParts = 0
    score = 0
    gameBoard.innerHTML = ''
}