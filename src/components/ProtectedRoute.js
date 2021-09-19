import React, { Component, Fragment } from 'react'
import NavBar from './NavBar';
import NewQuestion from './NewQuestion'
import LeaderBoard from './LeaderBoard'
import Home from './Home'
import QuestionsChecker from './QuestionsChecker'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFoundPage from './NotFoundPage';

class ProtectedRoute extends Component {
    render() {
        return (
        <Router>
            <Fragment>
            <NavBar /> 
            <Switch>
            <Route exact  path='/' component={Home} ></Route>
            <Route path='/questions/:id' component={QuestionsChecker} />
            <Route path='/add' component={NewQuestion} /> 
            <Route path='/leaderboard' component={LeaderBoard}/> 
            <Route component={NotFoundPage} />
            </Switch>
            </Fragment>
            </Router>
        ) 
    }
}

export default ProtectedRoute
