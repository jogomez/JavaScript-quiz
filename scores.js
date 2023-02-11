const scoreList = document.querySelector('#scoresList');
const scores = JSON.parse(localStorage.getItem('highScores')) || [];

console.log('highScores :>> ', localStorage.getItem('highScores'));
console.log('scores :>> ', scores);

scoresList.innerHTML = 
scores.map(score => {
    return `<li class="score">${score.name} - ${score.score} </li>`;
}).join('');