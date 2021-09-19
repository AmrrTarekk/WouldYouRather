import { hideLoading, showLoading } from "react-redux-loading"
import { saveQuestion, saveQuestionAnswer } from "../utils/api"

export const RECEIVE_QUESTION = 'RECEIVE_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_ANSWER = 'ADD_ANSWER'

export function receiveQuestion (questions) {
    return {
        type: RECEIVE_QUESTION,
        questions,
    }
}

function addQuestion (question) {
    return {
        type: ADD_QUESTION,
        question,
    }
}

function addQuestionAnswer({qid, answer, authedUser }){
    return {
        type: ADD_ANSWER,
        info: {
            qid,
            answer,
            authedUser,
        },
    }
}


export function handleAddQuestion (optionOne,optionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState()

        dispatch(showLoading())
        return saveQuestion({
            optionOneText: optionOne,
			optionTwoText: optionTwo,
            author: authedUser
        })
        .then((question) => {
            dispatch(addQuestion(question))
        })
        .then(() => {
            dispatch(hideLoading())
        })
        .catch(() => {
            alert('An error was occurred when adding new question. Please try again.')
        })
    }
}


export function handleAddQuestionAnswer (qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState()
        
        dispatch(showLoading())

        return saveQuestionAnswer({
            qid,
            answer,
            authedUser
        })
        .then(() => {
            dispatch(addQuestionAnswer({
                qid,
                answer,
                authedUser
            }))
        })
        .then(() => {
            dispatch(hideLoading())
        })
        .catch(() => {
            alert('An error was occurred when adding your answer. Please try again.')
        })
    }

}
