import React, { Component } from 'react'
import { Card, Col, Row, Container, Button, Form } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { handleAddQuestionAnswer } from '../actions/questions';
import NotFoundPage from './NotFoundPage';

class NewAnswer extends Component {
    state = {
        test: ''
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { dispatch, question } = this.props
        const { id } = question
        const value = this.input.group1.value
        console.log("mashy:",value)

        if( value !== ''){
            dispatch(handleAddQuestionAnswer(id, value))
        }
        else { 
            this.setState({
                test: 'CHOOSE YOUR ANSWER FIRST'
            })
        }
    }
    render() {
        const { question } = this.props

        if (question === null) {
            return <NotFoundPage/>
        }

        const { author } = this.props
        const { optionOne, optionTwo} = question
        const { test } = this.state


        
        return (
            <div>
                <Container>
                    <Row className="justify-content-center">
                        <Col xs={10} md={7}>
                            <Card border="primary" className="m-3">
                                <Card.Header> 
                                    <Card.Text className='fontstyle' style={{color: '#3B5998'}}>{author.name} asks:</Card.Text>
                                </Card.Header>
                                
                                <Card.Body >

                                    <Row>
                                        <Col md={3} >
                                            <Image 
                                                src={author.avatarURL} 
                                                alt="image"
                                                width="100"
                                                height="100" 
                                                roundedCircle
                                            />
                                        </Col>
                                        
                                        <Col md={9}>
                                            <Card.Title className='fontstyle'>
                                                Would you rather 
                                            </Card.Title>
                                           

                                            <Form 
                                            onSubmit={this.handleSubmit} // (event) => this.handleSubmit(id,event) 
                                            ref={(input)=>this.input=input}
                                            >
                                                
                                                <Form.Group>
                                                <Form.Check
                                                    inline
                                                    label={optionOne.text}
                                                    value="optionOne"
                                                    name="group1"
                                                    type='radio'

                                                />
                                                </Form.Group>

                                                <Form.Group>
                                                <Form.Check
                                                    inline
                                                    label={optionTwo.text}
                                                    value="optionTwo"
                                                    name="group1"
                                                    type='radio'
                                                    
                                                />
                                                </Form.Group>

                                                {
                                                    test 
                                                    ? <h4 className='warn' >  &#9888; {test} &#9888;</h4>
                                                    : null 
                                                 }

                                                <Button type='submit'>
                                                    Submit
                                                </Button>
                                            </Form>
                                            
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

function mapStateToProps ({authedUser, users, questions}, { id }) {
    const question = questions[id]

    return {
        authedUser,
        question: question ? question : null,
        author: question ? users[question.author] : null
    }
}


export default connect(mapStateToProps)(NewAnswer)
