import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
  state = {
    results: {}, //{[id]: 'success' 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // {[id]: 'success' 'error'}
    quiz: [
      {
        question: "Сколько длилась вторая мировая война",
        rightAnswerId: 1,
        id: 1,
        answers: [
          { text: "6 лет", id: 1 },
          { text: "5 лет", id: 2 },
          { text: "4 года", id: 3 },
          { text: "7 лет", id: 4 },
        ],
      },
      {
        question: "В каком году образовался город Тирасполь ",
        rightAnswerId: 2,
        id: 2,
        answers: [
          { text: "в 1795г", id: 1 },
          { text: "в 1792г", id: 2 },
          { text: "в 1698г", id: 3 },
          { text: "в 1812г", id: 4 },
        ],
      },
      {
        question: "Израиль находится в каком регионе ",
        rightAnswerId: 4,
        id: 3,
        answers: [
          { text: "в Юго-Восточной Азии", id: 1 },
          { text: "на Балканах", id: 2 },
          { text: "в Центральной Азии", id: 3 },
          { text: "на Ближнем Востоке", id: 4 },
        ],
      },
      {
        question: "Столица Польши ",
        rightAnswerId: 2,
        id: 4,
        answers: [
          { text: "Краков", id: 1 },
          { text: "Варшава", id: 2 },
          { text: "Будапешт", id: 3 },
          { text: "Познань", id: 4 },
        ],
      },
      {
        question: "Сколько штатов в США",
        rightAnswerId: 3,
        id: 5,
        answers: [
          { text: "33", id: 1 },
          { text: "52", id: 2 },
          { text: "50", id: 3 },
          { text: "25", id: 4 },
        ],
      },
    ],
  };
  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      this.setState({
        answerState: { [answerId]: 'success' },
        results,
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          })
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: { [answerId]: 'error' },
        results
      })
    }
  };
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }
  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          
          {this.state.isFinished ? (
            
            <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          ) : (
            <ActiveQuiz
              answers={this.state.quiz[this.state.activeQuestion].answers}
              question={this.state.quiz[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              quizLength={this.state.quiz.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Quiz;
