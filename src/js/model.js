import { OPERATORS_LENGTH, SECONDS } from "./config.js";
import { generateRandomNumber } from "./helpers.js";
import "core-js/stable";

export const state = {
  serial: 0,
  config: {},
  bank: [],
  progress: {
    correct: 0,
    incorrect: 0,
    unattempted: 0,
    time: 0,
    timer: "",
  },
};

const getRandomOperatorIndex = function () {
  return generateRandomNumber(OPERATORS_LENGTH);
};

const getOperatorIndex = function (operator) {
  if (operator === "addition") return 0;
  if (operator === "subtraction") return 1;
  if (operator === "multiplication") return 2;
  if (operator === "division") return 3;
};

const getOperatorSymbol = function (index) {
  if (index === 0) return "+";
  if (index === 1) return "-";
  if (index === 2) return "x";
  if (index === 3) return "/";
};

const createQuestions = function () {
  let operator = 0;
  if (state.config.operator === "random") operator = getRandomOperatorIndex();
  if (state.config.operator !== "random")
    operator = getOperatorIndex(state.config.operator);

  for (let i = 0; i < state.config.questions; i++) {
    if (state.config.operator === "mixed") operator = getRandomOperatorIndex();

    const firstNumber = generateRandomNumber(state.config.difficulty);
    const lastNumber = generateRandomNumber(state.config.difficulty);

    let question = `${firstNumber} ${getOperatorSymbol(
      operator
    )} ${lastNumber}`;

    let answer;

    if (operator === 0) answer = firstNumber + lastNumber;
    if (operator === 1) answer = firstNumber - lastNumber;
    if (operator === 2) answer = firstNumber * lastNumber;
    if (operator === 3) {
      question = `${firstNumber * lastNumber} ${getOperatorSymbol(
        operator
      )} ${lastNumber}`;

      answer = (firstNumber * lastNumber) / lastNumber;
    }

    state.bank[i] = {
      question,
      answer,
    };
  }
};

export const newPractice = function (config) {
  state.config = {
    questions: +config.maxQuestions,
    operator: config.operator,
    time: +config.timeLimit,
    difficulty: +config.difficulty,
  };

  state.progress.unattempted = state.config.questions - 1;
  state.progress.time = state.config.time * SECONDS;
  createQuestions();
};

export const saveAnswer = function (answer) {
  state.bank[state.serial].userAnswer = answer;

  if (state.progress.unattempted > 0) state.progress.unattempted--;

  if (state.bank[state.serial].userAnswer === state.bank[state.serial].answer)
    state.progress.correct++;
  else state.progress.incorrect++;

  if (state.serial <= state.config.questions) state.serial++;
};
