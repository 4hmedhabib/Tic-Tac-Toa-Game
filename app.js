const X_ClASS = 'x';
const CIRCLE_CLASS = 'circle';

const cellElements = document.querySelectorAll('[data-cell]');
let circleTurn

cellElements.forEach(cell => {
    cell.addEventListener('click', handleClick, {
        once: true
    });
});

function handleClick(e) {
    cosnt cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_ClASS;
    placeMark(cell, currentClass)
    //  check a win
    //  check for draw
    //  switch turns
}