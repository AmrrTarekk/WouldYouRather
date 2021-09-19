import React, { Component } from 'react'
import { Nav, Navbar, Image, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { resetAuthedUser } from '../actions/authedUser';

class NavBar extends Component {

    handleLogout = (event) => {
        event.preventDefault()
        const { dispatch, id } = this.props
        dispatch(resetAuthedUser(id)) 
    }

    render() {
        const { name , avatarURL } = this.props
        return (
            <div>
                <Navbar collapseOnSelect bg="light" expand="lg" className='fontstyle1'>
                    <Container>
                        <Navbar.Brand as={Link} to="/" className='icon' style={{color: 'white'}}>Board..?</Navbar.Brand>

                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

                            <Navbar.Collapse id="responsive-navbar-nav">

                                <Nav className="me-auto">
                                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                                    <Nav.Link as={Link} to="/add">New Question</Nav.Link>
                                    <Nav.Link as={Link} to="/leaderboard">Leader Board</Nav.Link>
                                </Nav>
                                <Image 
                                    src={avatarURL} 
                                    alt="image"
                                    width="50"
                                    height="50"
                                    roundedCircle
                                />
                                Hello,
                                <Nav>
                                <Nav.Link as={Link} to="/leaderboard">  
                                        {name} &#128513;
                                </Nav.Link>
                                </Nav>
                                <button onClick={this.handleLogout} className="button button2">Logout</button>
                            </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        )
    }
}

function mapStateToProps ({authedUser, users}) {
    const user = users[authedUser]
    const name = user.name
    const avatarURL = user.avatarURL
    const id = user.id

    return {
        name,
        avatarURL,
        id
    }
}

export default connect(mapStateToProps)(NavBar)

