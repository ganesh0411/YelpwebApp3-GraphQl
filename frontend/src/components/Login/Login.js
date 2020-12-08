import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import { Redirect } from 'react-router'
import { graphql, compose } from 'react-apollo'
import { loginUserQuery } from '../../queries/queries'
import passwordHash from 'password-hash'


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            errMsg: ""
        }
        this.redirectVar = null
    }

    IsValueEmpty = (Value) => {
        if ("".localeCompare(Value.replace(/\s/g, "")) === 0)
            return true
        return false
    }

    IsValidEmailID = (EmailID) => {
        if (EmailID.match(/^[a-z][a-z0-9\._]*[@][a-z]+[.][a-z]+$/)) {
            return true
        }
        return false
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitLogin = (e) => {
        const data = {
            userEmailID: this.state.username,
            userPassword: this.state.password
        }
        if (this.IsValueEmpty(data.userEmailID) || this.IsValueEmpty(data.userPassword)) {
            this.setState({
                errMsg: "Fiels cannot be empty"
            })
        } else if (!this.IsValidEmailID(data.userEmailID)) {
            this.setState({
                errMsg: "Invalid email ID"
            })
        } else {
            var index,
                isFound = false,
                allUserData = this.props.loginUserQuery
            for(index in allUserData.allUsers) {
                if (allUserData.allUsers[index].email === this.state.username && passwordHash.verify(this.state.password, allUserData.allUsers[index].password)) {
                    localStorage.setItem("userId", allUserData.allUsers[index].id)
                    localStorage.setItem("userName", allUserData.allUsers[index].firstname)
                    localStorage.setItem("isOwner", allUserData.allUsers[index].isOwner)
                    isFound = true
                }
            }
            if(isFound) {
                this.setState({
                    username: "",
                    password: "",
                    errMsg: ""
                })
            } else {
                this.setState({
                    errMsg: "Error in login"
                })
            }
        }
    }

    render() {

        if (localStorage.getItem('isOwner') === "false") {
            this.redirectVar = <Redirect to="/user/home" />
        } else if (localStorage.getItem('isOwner') === "true") {
            this.redirectVar = <Redirect to="/owner/home" />
        }
        return (
            <div>
                {this.redirectVar}
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4 offset-md-4 mt-5 p-5 shadow">
                            <h4>Signin with your yelp account</h4>
                            <div class="mt-3">
                                <div class="form-group">
                                    <label for="userEmailID">Email address</label>
                                    <input type="email" id="userEmailID" onChange={this.usernameChangeHandler} class="form-control" value={this.state.username} required></input>
                                </div>
                                <div class="form-group">
                                    <label for="userPassword">Password</label>
                                    <input type="password" id="userPassword" onChange={this.passwordChangeHandler} class="form-control" value={this.state.password} required></input>
                                </div>
                                <div class="text-center">
                                    <p class="text-danger"> {this.state.errMsg} </p>
                                </div>
                                <div class="form-group">
                                    <input type="submit" id="userLogin" onClick={this.submitLogin} class="form-control bg-success text-white" value="Login"></input>
                                </div>
                                <div class="panel text-center">
                                    <p>or</p>
                                    <p><Link to="/create-account">Create account</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(loginUserQuery, { name: "loginUserQuery" }),
)(Login)