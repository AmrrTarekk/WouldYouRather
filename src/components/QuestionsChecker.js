import React from "react";
import { connect } from "react-redux";
import AnsQuesRatio from "./AnsQuesRatio";
import NewAnswer from "./NewAnswer";



class QuestionsChecker extends React.Component{
    render(){
        
        const { ans }=this.props
        const id = this.props.match.params.id


        const answered = ans.hasOwnProperty(id) ? true : false
        console.log('id',id)

        return(
            <div>
          {
              answered 
              ? <AnsQuesRatio id={id} />
              : <NewAnswer id={id} />
          }
        </div>
        )
    }
}
function mapStateToProps({authedUser,users}){
    const ans = users[authedUser].answers
    return{
        ans,
    }
}
export default connect(mapStateToProps)(QuestionsChecker)