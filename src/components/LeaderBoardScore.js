import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Container, Card, Row, Col, Image } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';


class LeaderBoardScore extends Component {
    render() {
        // console.log('user: ', this.props)
        const { answers, name, avatarURL, questions } = this.props
        return (
            <div>
                  <Container>
               <Row className="justify-content-center">
                    <Col xs={10} md={7}>
                        <Card border="primary" className="m-1" style={{backgroundColor:'#ece9e4a4'}}>
                            
                            <Card.Header> 
                                <Card.Text className='fontstyle' style={{color: '#3B5998'}}> {name}</Card.Text>
                            </Card.Header>
                            
                            <Card.Body >

                                <Row>
                                    <Col md={3} >
                                        <Image 
                                            src={avatarURL} 
                                            alt="image"
                                            width="100"
                                            height="100"
                                            roundedCircle
                                            
                                        />
                                    </Col>

                                    <Col md={6}>
                                        <Card.Text className='fontstyle'>Answered Questions: {answers.length}</Card.Text>
                                        <Card.Text className='fontstyle'>Created Questions: {questions.length}</Card.Text>
                                    </Col>

                                    <Col md={3}>
                                        <div className='circle-header'>SCORE</div>
                                        <div className='circle'>
                                            {answers.length + questions.length}
                                             
                                        </div>
                                    </Col>

                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                </Container>
            </div>
        )
    }
}

function mapStateToProps({users}, {id}) {
    const user = users[id]
    const answers = Object.keys(user.answers)
    const name = user.name
    const avatarURL = user.avatarURL
    const questions = user.questions
    return {
        user,
        answers,
        name,
        avatarURL,
        questions
    }
}

export default connect(mapStateToProps)(LeaderBoardScore)