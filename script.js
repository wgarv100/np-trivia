import { questions } from "./questions.js";

const startButton = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const nextButton = document.getElementById("next-btn");
const questionText = document.getElementById("question-text");
const resetButton = document.getElementById("reset-btn");
const counter = document.getElementById("counter");
const result = document.getElementById("result-text");
const answersContainer = document.querySelector(".answers-container");
const answersBtn = document.querySelectorAll(".answers-btn");

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", nextQuestion);
resetButton.addEventListener("click", resetPoints);

let randomQuestion, clickedButton, correctAnswer;

let getTotalPoints = +localStorage.getItem("totalPoints");
counter.textContent = `Points: ${getTotalPoints}`;

function startGame() {
  startButton.classList.add("hide");
  questionContainer.classList.remove("hide");
  nextQuestion();
}

function generateQuestion() {
  randomQuestion = questions[Math.floor(Math.random() * questions.length)];
}

function nextQuestion() {
  nextButton.classList.add("hide");
  generateQuestion();
  questionText.textContent = randomQuestion.question;
  randomQuestion.answers.forEach((answer, index) => {
    document.getElementById(`answers-btn-${index + 1}`).textContent =
      answer.text;
    result.textContent = "";
  });
  enableAnswerButtons();
}

function incrementPoints() {
  getTotalPoints += 10;
  localStorage.setItem("totalPoints", getTotalPoints);
  counter.textContent = `Points: ${getTotalPoints}`;
}

function resetPoints() {
  localStorage.removeItem("totalPoints");
  getTotalPoints = 0;
  counter.textContent = `Points: ${getTotalPoints}`;
}

function disableAnswerButtons() {
  answersBtn.forEach((answer) => {
    return (answer.disabled = true);
  });
}

function enableAnswerButtons() {
  answersBtn.forEach((answer) => {
    return (answer.disabled = false);
  });
}

answersContainer.addEventListener("click", (event) => {
  clickedButton = event.target.textContent;
  checkAnswer();
  disableAnswerButtons();
});

function checkAnswer() {
  correctAnswer = randomQuestion.answers.find((answer) => {
    return answer.correct === true;
  });

  if (clickedButton === correctAnswer.text) {
    incrementPoints();
    result.textContent = "Correct!";
  } else {
    result.textContent = "Incorrect";
  }
  result.classList.remove("hide");
  nextButton.classList.remove("hide");
}
