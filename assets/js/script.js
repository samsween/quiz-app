import { questions } from "./data.js";
import { homePage, questionPage, resultsPage } from "./pages.js";
import {addObjectToArrayLS} from "./localStorage.js";


const startQuizBtn = document.getElementById('start-quiz');
const time = document.getElementById('time');
const timeContainer = document.getElementById('time-container');
const main = document.querySelector('main');


let timer;
let currentTime = 75;
let pageIndex = 0;


const startTimer = () => {
    timeContainer.style.visibility = "visible";
    timer = setInterval(()=>{
        currentTime --;
        if (currentTime === 0){
            stopTimer();
            endQuizPage();
            return;
        }
        time.innerText = currentTime;
    }, 1000)
}
const stopTimer = () => {
    timeContainer.style.visibility = "hidden";
    time.innerText = "";
    clearInterval(timer);
}


const startQuiz = () => {
    startTimer();
    showQuizPage();
}

const showQuizPage = () => {
    main.innerHTML = questionPage(questions[pageIndex]);
    const answerBtns = document.querySelectorAll('.button.answer-btn');
    answerBtns.forEach(btn=>{
        btn.addEventListener('click', answerBtnClick);
    })
}


const answerBtnClick = (e) => {
    if (e.target.innerHTML !== questions[pageIndex].correct) currentTime -=10;
    pageIndex ++;
    if (!questions[pageIndex]) {
        endQuizPage(); 
        return;
    } 
    showQuizPage();
}


const endQuizPage = () => {
    stopTimer();
    main.innerHTML = resultsPage(currentTime);
    const submitScoreBtn = document.getElementById('submit-score-btn');
    submitScoreBtn.onclick = submitScore;
}

const submitScore = (e) => {
    const initials = document.getElementById('initials').value;
    const newScore = {initials, score: currentTime};
    addObjectToArrayLS("score", newScore);
    main.innerHTML = homePage();
    const scoresPage = document.getElementById('scores-page');
    scoresPage.style.visibility = "visible";
}

startQuizBtn.onclick = startQuiz;