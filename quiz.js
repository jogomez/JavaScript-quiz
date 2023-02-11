const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#quizStatus-item-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
const countdownEl = document.querySelector('#count-down');

var currentQuestion = {};
var acceptingAnswersFlag = true;
var score = 0;
var questionCounter = 0;
var availableQuestions = [];
var timer;
const TOTAL_TIME_SECS = 25
var secondsRemaining = TOTAL_TIME_SECS;

var questions = [
{
    question: 'Inside which HTML element do we put the JavaScript?',
    choice1: '<script>',
    choice2: '<scripting>',
    choice3: '<js>',
    choice4: '<javascript>',
    answer: 1
},
{
    question: "Where is the correct place to insert a JavaScript?",
    choice1: 'The <head> section',
    choice2: 'The <body> section',
    choice3: 'Both the <head> and the <body> sections are correct',
    choice4: 'Other',
    answer: 3
},
{
    question: 'What is the correct syntax for referring to an external script called "xxx.js"?',
    choice1: '<script name="xxx.js">',
    choice2: '<script src="xxx.js">',
    choice3: '<script href="xxx.js">',
    answer: 2
},
{
    question: 'How do you write "Hello World" in an alert box?"?',
    choice1: 'msg("Hello World");',
    choice2: 'msgBox("Hello World");',
    choice3: 'alert("Hello World");',
    choice4: 'alertBox("Hello World");',
    answer: 3
},
{
    question: 'How do you create a function in JavaScript?',
    choice1: 'function:myFunction();',
    choice2: 'function = myFunction();',
    choice3: 'function myFunction();',
    answer: 3
}]


const SCORE_POINTS = 100;
const MAX_QUESTIONS = questions.length;

startQuiz = () => {
    questionCounter = 0;
    score  = 0;
    availableQuestions = [...questions];
    timer = setInterval(() => {
        secondsRemaining--;
        countdownEl.textContent = secondsRemaining;
    }, 1000);
    getNextQuestion();
}

getNextQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        localStorage.setItem('mostRecentScore', score);
        clearInterval(timer);
        secondsRemaining = TOTAL_TIME_SECS;
        return window.location.assign('end.html');
    }
    questionCounter++;
    console.log('questionCounter :>> ', questionCounter);
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    //progressBarFull.getElementsByClassName.width = `${(questionCounter/MAX_QUESTIONS)*100}%`;
    
    const questionsIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.getAttribute('option-number');
        choice.innerText = currentQuestion['choice'+number];
    })

    availableQuestions.splice(questionsIndex,1);

    console.log('availableQuestions :>> ', availableQuestions);

    acceptingAnswersFlag = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', event => {
        
        if (!acceptingAnswersFlag) {return;}
        acceptingAnswersFlag = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.getAttribute('option-number');

        var classToUpdate = '';
        if (selectedAnswer == currentQuestion.answer ){
            classToUpdate = 'correctAnswer';
            scoreText.innerText = score += SCORE_POINTS;
        }
        else{
            classToUpdate = 'incorrectAnswer';
        }

        selectedChoice.parentElement.classList.add(classToUpdate);

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToUpdate);
            getNextQuestion();
        }, 1200)
    })
})

startQuiz();