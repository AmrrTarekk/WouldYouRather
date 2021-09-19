import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import  LoadingBar  from 'react-redux-loading';

import LoginCard from './LoginCard'
import ProtectedRoute from './ProtectedRoute';


class App extends Component {
  componentDidMount(){
    const { dispatch } = this.props

    dispatch(handleInitialData())
  }

  render() {
    const { authedUser } = this.props
    return (
      <div>
        <LoadingBar />
        { !authedUser
              ? <h4 className='center'>
                  <LoginCard/>
                </h4> 
          : <ProtectedRoute />
        }
      </div>
    )
  }
}

function mapStateToProps ({authedUser}) {
  return {
    authedUser
  }
}



export default connect(mapStateToProps)(App)
