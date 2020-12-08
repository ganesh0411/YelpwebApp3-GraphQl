import React, { Component } from 'react';
import {Redirect} from 'react-router';

class Logout extends Component {

    render(){
        localStorage.removeItem("userId")
        localStorage.removeItem("userName")
        localStorage.removeItem("isOwner")
        var redirectVar = <Redirect to="/welcome"></Redirect>
        return(
            <div>{ redirectVar }</div>
        )
    }
}

//export LogoutClass Component
export default Logout;