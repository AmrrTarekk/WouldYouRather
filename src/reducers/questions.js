import { ADD_ANSWER, ADD_QUESTION, RECEIVE_QUESTION } from "../actions/questions"


export default function questions ( state = {} , action) {
    switch(action.type){
        case RECEIVE_QUESTION : 
            return {
                ...state,
                ...action.questions
            }
        case ADD_QUESTION : 
            const { question } = action
            return {
                ...state,
                [question.id]: action.question
            }
        case ADD_ANSWER : 
            const { qid, answer, authedUser } = action.info
            return {
                ...state,
                [qid]: {
                  ...state[qid],
                  [answer]: {
                    ...state[qid][answer],
                    votes: state[qid][answer].votes.concat([authedUser])
                  }
                }
            }
        default : 
            return state
    }
}