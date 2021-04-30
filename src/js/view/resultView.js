import View from "./View.js";
import "core-js/stable";

class ResultView extends View {
  _parentElement = document.querySelector(".renderArea");

  _generateMarkup() {
    return `
        <div class="result">
        ${this._data.bank
          .filter((result) => (result.userAnswer !== undefined ? true : false))
          .map((result, index, arr) => {
            const html = `
            <div class="practice__result">
              <span class="practice__question--number"> Question (${
                index + 1
              }/${arr.length}) </span>
              <div class="practice__question--title">
                ${result.question}
              </div>
              <div class="practice__result--answer">
                <div class="practice__result--correct-answer">
                  <span class="practice__result--text">Correct answer</span>
                  <span class="practice__result--value">${result.answer}</span>
                </div>
                <div class="practice__result--user-answer ${
                  result.answer === result.userAnswer ? "correct" : "incorrect"
                }">
                  <span class="practice__result--text">Your answer</span>
                  <span class="practice__result--value">${
                    result.userAnswer
                  }</span>
                </div>
              </div>
            </div>
            `;
            return html;
          })
          .join("")}
        </div>
        `;
  }
}

export default new ResultView();
