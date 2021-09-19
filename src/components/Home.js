import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tab, Tabs } from 'react-bootstrap';
import QCard from './QCard';



class Home extends Component { 
    render() {
        const { answeredQuestions, unAnsweredQuestions } = this.props
        console.log('okay', this.props)
        return (
            <div>
                <Tabs fill defaultActiveKey="unAnsweredQuestions" id="uncontrolled-tab-example" className="mb-3">
                    <Tab default eventKey="unAnsweredQuestions" title="Unanswered Questions">
                        <ul> 
                            {unAnsweredQuestions.map((id) => (
                                <li key={id}>
                                    <QCard id={id} />
                                </li>
                            ))}
                        </ul>
                    </Tab>

                    <Tab eventKey="AnsweredQuestions" title="Answered Questions">
                    <ul> 
                            {answeredQuestions.map((id) => (
                                <li key={id}>
                                   <QCard id={id} />
                                </li>
                            ))}
                        </ul>
                    </Tab>

                </Tabs>
            </div>
        )
    }
}


function mapStateToProps ({questions, authedUser, users}) {

    const qIds = Object.keys(questions)
    const ans = users[authedUser].answers

    const answeredQuestions = qIds.filter((id) => ans.hasOwnProperty(id))
                .sort((a, b) => questions[b].timestamp - questions[a].timestamp)

    const unAnsweredQuestions = qIds
    .filter((id) => !ans.hasOwnProperty(id))
    .sort((a, b) => questions[b].timestamp - questions[a].timestamp);



    return {
      answeredQuestions,
      unAnsweredQuestions
    }
}

export default connect(mapStateToProps)(Home)


