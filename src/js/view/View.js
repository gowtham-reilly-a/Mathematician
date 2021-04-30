import "core-js/stable";
export default class View {
  _data;
  _btnNew = document.querySelector(".start-new");
  _parentElement = document.querySelector(".container");
  _practice = document.querySelector(".practice");
  _nav = document.querySelector(".nav");
  _newPractice = document.querySelector(".new-practice");
  _userAnswerSubmitForm = document.querySelector(
    ".practice__question--answer-form"
  );
  _userAnswer = document.querySelector("#practice__question--answer");

  _correct = document
    .querySelector(".practice__progress--correct")
    .querySelector(".practice__progress--value");

  _incorrect = document
    .querySelector(".practice__progress--incorrect")
    .querySelector(".practice__progress--value");

  _unattempted = document
    .querySelector(".practice__progress--unattempted")
    .querySelector(".practice__progress--value");

  _timer = document
    .querySelector(".practice__progress--timer")
    .querySelector(".practice__progress--value");

  constructor() {
    this._btnNew.addEventListener("click", this._reset.bind(this));
  }

  updateProgress(data) {
    this._correct.textContent = data.correct;
    this._incorrect.textContent = data.incorrect;
    this._unattempted.textContent = data.unattempted;
  }

  updateTimer(time) {
    this._timer.textContent = time;
  }

  toggleAnswerInput() {
    this._userAnswerSubmitForm.classList.toggle("hidden");
    this._userAnswer.focus();
  }

  toggleView() {
    this._nav.classList.toggle("hidden");
    this._newPractice.classList.toggle("hidden");
    this._practice.classList.toggle("hidden");
    this.toggleAnswerInput();
  }

  render(data) {
    this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.innerHTML = "";
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  _reset() {
    window.location.reload();
  }
}
