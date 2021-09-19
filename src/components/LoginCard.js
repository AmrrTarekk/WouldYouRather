import React, { Component } from 'react'
import { Form, Card, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import 'bootstrap/dist/css/bootstrap.min.css';


class LoginCard extends Component {
    state = {
        loged: true
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const loggedUser = this.input.value
        const { dispatch } = this.props


        
        if (loggedUser !=='') {
            console.log('Logged as: ',loggedUser)

            dispatch(setAuthedUser(loggedUser))

        }
        else {
            this.setState({
                loged: false
            })
        }
    }


    render() {
        const { userId } = this.props
        const { loged } = this.state

        return (
            <div className='center'>
                    
                <Card border="primary" className='logg' >
                    <Card.Header>Please Login first</Card.Header>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group >
                            <Form.Label>Username</Form.Label>
                                {
                                    loged === true 
                                    ? null 
                                    : <p className='warning'>&#9888;Try choosing a username&#9888;</p>
                                }
                                <Form.Control as='select' ref={(input)=> this.input=input}>

                                    <option value=''>Select a User</option>

                                    {userId.map((user) => (
                                        <option value={user.id} key={user.id}> {user.name} </option>
                                    ))}
                                    
                            </Form.Control>

                            <Button type='submit' style={{margin: '10px'}}>Let's play!</Button>

                        </Form.Group>

                    </Form>
                </Card>
           
           </div>
        )
    }
}

function mapStateToProps ({users}) {
    const usersIds = Object.keys(users)
    const userId = usersIds.map((id) => ({
        id,
        name: users[id].name
    }))
    return {
        userId
    } 
}


export default connect(mapStateToProps)(LoginCard)