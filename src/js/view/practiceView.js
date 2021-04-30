import "core-js/stable";
import View from "./View.js";

class practiceView extends View {
  _parentElement = document.querySelector(".renderArea");

  addHandlerSubmit(handler) {
    this._userAnswerSubmitForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputEl = this.querySelector("#practice__question--answer");
      const answer = Number(inputEl.value);
      inputEl.value = "";

      handler(answer);
    });
  }

  _generateMarkup() {
    return `
        <div class="practice__question">
          <span class="practice__question--number"> Question (${
            this._data.serial + 1
          }/${this._data.bank.length}) </span>
          <div class="practice__question--title">${
            this._data.bank[this._data.serial].question
          }</div>
        </div>
        `;
  }
}

export default new practiceView();
