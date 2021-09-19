import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { Card, Col, Row, Button, Form } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';



class NewQuestion extends Component {
    state = {
        textOne: '',
        textTwo: '',
        toHome: false
    }

    handleChangeOne = (event) => {
        const textOne = event.target.value
        this.setState(() => ({
            textOne,
        }))
    }
    
    handleChangeTwo = (event) => {
        const textTwo = event.target.value
        this.setState(() => ({
            textTwo,
        }))
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const { textOne, textTwo } = this.state
        const { dispatch, id } = this.props

        console.log('Option 1: ', textOne)
        console.log('Option 2: ', textTwo)

        dispatch(handleAddQuestion(textOne,textTwo))

          
        this.setState(() => ({
            text: '',
            toHome: id ? false : true, 
        }))
    } 

    render() {
        const { textOne, textTwo, toHome } = this.state

        if (toHome === true){
            return <Redirect to='/' />
        }
        return (
            <div>
                <Row className="justify-content-center">
                    <Col  xs={10} md={6}>
                        <Card border="primary" className="m-3">
                            <Card.Header className='center fontstyle'>Create New Question</Card.Header>
                            <Card.Text style={{margin: '10px'}}>Complete the question:</Card.Text>
                            <h3 style={{margin: '10px'}}>Would you rather ...</h3>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group>
                                        <Form.Control
                                        type='text' 
                                        placeholder='Enter Option One Text Here'
                                        onChange={this.handleChangeOne}
                                        />
                                    </Form.Group>
                                        <h3 className='center or' >OR</h3>
                                    <Form.Group>
                                        <Form.Control 
                                        type='text' 
                                        placeholder='Enter Option Two Text Here'
                                        onChange={this.handleChangeTwo}
                                    />
                                    </Form.Group>
                                    <div className='center subm' style={{margin: '20px'}}>
                                    <Button
                                        type='submit'
                                        variant='outline-primary'
                                        disabled={textOne === '' || textTwo === ''} 
                                    >
                                     Submit
                                    </Button>
                                    </div>
                                </Form>
                        </Card>
                    </Col>
                </Row>

            </div>
        )
    }
}
export default connect()(NewQuestion)
