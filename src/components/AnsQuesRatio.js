import React, { Component } from 'react'
import { connect } from 'react-redux'   
import { Card, Col, Row, Container, Collapse, Button, Image  } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import { ProgressBar } from 'react-bootstrap';
import NotFoundPage from './NotFoundPage'


 class AnsQuesRatio extends Component {
     state={
        open: false
     }
     setOpen = () => {
        this.setState({
                open: true 
             }) 
     }
    render() {

        const { question } = this.props

        if ( question === null ) {
            return <NotFoundPage/>
        }
        
        // console.log('question', this.props.question)
        // console.log('author', this.props.author)


        
        const {  author , authedUser } = this.props
        const { optionOne , optionTwo } = question
        
        const allVotes = optionOne.votes.length + optionTwo.votes.length
        const optionOneRatio = Math.round(( optionOne.votes.length/allVotes )*100)
        const optionTwoRatio = Math.round(( optionTwo.votes.length/allVotes )*100)
     
        return (
            <div >
                <Container>
                <Row className="justify-content-center">
                    <Col xs={10} md={7}>
                        <Card border="primary" className="m-3">
                            <Card.Header> 
                                <Card.Text className='fontstyle'>{author.name} asks:</Card.Text>
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
                                        <Card.Title  style={{fontSize: '20px'}}>
                                            Would you rather 
                                            
                                        </Card.Title>
                            
                                        <div style={{fontSize: '18px'}}>
                                        <ul>
                                        { optionOne && (
                                                <li>
                                                    1) {optionOne.text}
                                                   
                                                </li>
                                                )}
                                                 { optionTwo && (
                                                <li>
                                                   2) {optionTwo.text}
                                                  

                                                </li>
                                                )}

                                        </ul>
                                        </div>
                                        <hr/>
                                        

                                        <Collapse in={this.state.open}>
                                        <div id="example-Collapse-text"  style={{fontSize: '12px'}} >
                                            <ul>
                                                { optionOne && (
                                                <li>
                                                    <p style={{fontWeight: 'bold'}}> 1) {optionOne.text}</p>
                                                    {
                                                        optionOne.votes.includes(authedUser) 
                                                        ? <p className='answers'> 	&#128512; Your Answer 	&#128512;</p>
                                                        : null
                                                    }

                                                </li>
                                                )}
                                                    <ProgressBar
                                                        now={optionOneRatio}
                                                        label={`${optionOneRatio}%`}
                                                        variant="success"
                                                        striped
                                                    />
                                                    <p className='votes'>{optionOne.votes.length} out of {allVotes} votes. &#128519;</p>
                                                { optionTwo && (
                                                <li>
                                                     <p style={{fontWeight: 'bold'}}>2) {optionTwo.text}</p>
                                                    {
                                                        optionTwo.votes.includes(authedUser) 
                                                        ? <p className='answers'>	&#128512; Your Answer 	&#128512;</p>
                                                        : null
                                                    }

                                                </li>
                                                )}
                                                    <ProgressBar
                                                        label={`${optionTwoRatio}%`}
                                                        now={optionTwoRatio}
                                                        variant="success"
                                                        striped
                                                    />
                                                <p className='votes'>{optionTwo.votes.length} out of {allVotes} votes. &#128519;</p>
                                            </ul>
                                        </div> 
                                        </Collapse>

                                            


                                        <Button
                                            onClick={() => this.setOpen(!this.state.open)}
                                            aria-controls="example-Collapse-text"
                                            aria-expanded={this.state.open}
                                            ref={(input) => this.input=input}
                                            disabled={this.state.open === true}
                                        >
                                            View Results
                                        </Button>
                                        
                                        
                                        
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


export default connect(mapStateToProps)(AnsQuesRatio)