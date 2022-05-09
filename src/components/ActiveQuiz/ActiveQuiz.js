import React from "react";
import classes from './ActiveQuiz.module.css'
import Answerslist from "./AnswersList/AnswersList";

const ActiveQuiz = props =>{
    return(
        <>
        <h1>Ответьте правильно на вопрос:</h1>
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
            <strong>{props.answerNumber}.</strong>&nbsp;
               {props.question}
            </span>
            <small>{props.answerNumber} из {props.quizLength}</small>
        </p>
        <Answerslist
        state={props.state}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}

        />
    </div>
    </>
)
    }
export default ActiveQuiz;