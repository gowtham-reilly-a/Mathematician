import "core-js/stable";
import View from "./View.js";

class NewPracticeView extends View {
  _newPracticeForm = document.querySelector(".new-practice__form--el");
  _operator = document
    .querySelector(".practice__stat--operator")
    .querySelector(".practice__stat--value");

  _difficulty = document
    .querySelector(".practice__stat--difficulty")
    .querySelector(".practice__stat--value");

  _questions = document
    .querySelector(".practice__stat--max-questions")
    .querySelector(".practice__stat--value");

  _time = document
    .querySelector(".practice__stat--time-limit")
    .querySelector(".practice__stat--value");

  setStats(data) {
    this._operator.textContent = data.operator;
    this._difficulty.textContent = data.difficulty;
    this._questions.textContent = data.questions;
    this._time.textContent = data.time;
  }

  addHandlerNewPracticeForm(handler) {
    this._newPracticeForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }
}

export default new NewPracticeView();
