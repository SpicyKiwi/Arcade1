import { onSnake, expandSnake } from './snake.js'
import { randomGridPosition } from './grid.js'


let food = getRandomFoodPosition()

export let expansionRate = 1

$('.easy').click(function() {
    expansionRate = 1
    return
})

$('.normal').click(function() {
    expansionRate = 2
    return
})

$('.hard').click(function() {
    expansionRate = 3
    return
})

export function update() {
    if (onSnake(food)) {
        expandSnake(expansionRate)
        food = getRandomFoodPosition()
    }
}

export function draw(gameBoard) {

    const foodElement = document.createElement('div')

    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x

    foodElement.classList.add('apple')

    gameBoard.appendChild(foodElement)
    
}

function getRandomFoodPosition() {
    let newFoodPosition

    while(newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition()
    }
    return newFoodPosition
}