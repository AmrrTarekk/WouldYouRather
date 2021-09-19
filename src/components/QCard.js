import React, { Component } from 'react'
import { Card, Col, Row, Container, Button } from 'react-bootstrap'
import Image from 'react-bootstrap/Image'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';

class QCard extends Component {
    render() {
        
        const { question , author  } = this.props
        const { optionOne, id, timestamp } = question
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
                                    
                                    <Col md={6}>
                                        <Card.Title className='fontstyle'>
                                            Would you rather ... ?
                                        </Card.Title>
                                        <Card.Text>...{optionOne.text.slice(0,10)}...</Card.Text>

                                    
                                        {/* Todo: Make a link to view the ratio */}
                                        <Link to={`/questions/${id}`} >
                                        <Button variant='primary'>
                                            View Poll
                                        </Button>
                                        </Link>



                                    </Col>
                  
                                </Row>


                            </Card.Body>
                            <Card.Footer className='timestamp'>
                                {formatDate(timestamp)}
                            </Card.Footer>
                        </Card>
                    </Col>
                </Row>
                </Container>
            </div>

        )
    }
}

function mapStateToProps ({users, questions}, { id }) {
    const question = questions[id]

    return {
        question: question ? question : null,
        author: question ? users[question.author] : null
    }
}


export default connect(mapStateToProps)(QCard)