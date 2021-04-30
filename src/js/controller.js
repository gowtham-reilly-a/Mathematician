import * as model from "./model.js";
import newPracticeView from "./view/newPracticeView.js";
import practiceView from "./view/practiceView.js";
import resultView from "./view/resultView.js";

import "core-js/stable";

let timer;

const tick = function (progress) {
  const min = Math.trunc(progress.time / 60);
  const sec = progress.time % 60;

  progress.timer = `${min}:${sec}`;

  practiceView.updateTimer(progress.timer);
  progress.time--;

  if (progress.time < 0) {
    practiceView.toggleAnswerInput();
    resultView.render(model.state);
    clearInterval(timer);
  }
};

const setTimer = function (progress) {
  tick(progress);
  timer = setInterval(() => {
    tick(progress);
  }, 1000);
};

const controlNewPractice = function (data) {
  model.newPractice(data);
  newPracticeView.toggleView();
  newPracticeView.setStats(model.state.config);
  practiceView.updateProgress(model.state.progress);
  practiceView.render(model.state);
  setTimer(model.state.progress);
};

const controlPractice = function (answer) {
  model.saveAnswer(answer);

  if (model.state.serial < model.state.bank.length)
    practiceView.render(model.state);
  else {
    practiceView.toggleAnswerInput();
    resultView.render(model.state);
    clearInterval(timer);
  }

  practiceView.updateProgress(model.state.progress);
};

const init = function () {
  newPracticeView.addHandlerNewPracticeForm(controlNewPractice);
  practiceView.addHandlerSubmit(controlPractice);
};

init();
