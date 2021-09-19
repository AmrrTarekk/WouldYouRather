import { receiveQuestion } from "./questions";
import { receiveUsers } from "./users";
import { getInitialData } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'



export function handleInitialData () {
    return (dispatch) => {
        dispatch(showLoading())
        return getInitialData()
            .then(({users, questions}) => {
                dispatch(receiveUsers(users))
                dispatch(receiveQuestion(questions))
                dispatch(hideLoading())
            })
    }
}