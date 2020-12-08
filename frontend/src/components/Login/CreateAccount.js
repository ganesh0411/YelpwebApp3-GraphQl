import React, { Component } from 'react'
import '../../App.css'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { graphql, compose } from 'react-apollo'
import { createUserMutation } from '../../mutation/mutations'
import passwordHash from 'password-hash'

class CreateAccount extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            isOwner: false,
            errMsg: ""
        }
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

    IsValidName = (Name) => {
        if (Name.match(/^[a-zA-Z ]+$/)) {
            return true
        }
        return false
    }

    firstnameChangeHandler = (e) => {
        this.setState({
            firstname: e.target.value
        })
    }

    lastnameChangeHandler = (e) => {
        this.setState({
            lastname: e.target.value
        })
    }

    emailChangeHandler = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    passwordChangeHandler = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    isOwnerChangeHandler = (e) => {
        this.setState({
            isOwner: !this.state.isOwner
        })
    }

    submitCreateAccount = (e) => {
        const data = {
            userFirstName: this.state.firstname,
            userLastName: this.state.lastname,
            userEmailID: this.state.email,
            userPassword: this.state.password,
            isOwner: this.state.isOwner
        }
        if (this.IsValueEmpty(data.userFirstName) || this.IsValueEmpty(data.userLastName) || this.IsValueEmpty(data.userEmailID) || this.IsValueEmpty(data.userPassword)) {
            this.setState({
                errMsg: "All the fields are required"
            })
        } else if (!this.IsValidEmailID(data.userEmailID)) {
            this.setState({
                errMsg: "Invalid email ID"
            })
        } else if (!this.IsValidName(data.userFirstName) || !this.IsValidName(data.userLastName)) {
            this.setState({
                errMsg: "Username has to contain only alphabets"
            })
        } else {
            this.props.createUserMutation({
                variables: {
                    firstname: this.state.firstname,
                    lastname: this.state.lastname,
                    email: this.state.email,
                    password: passwordHash.generate(this.state.password),
                    isOwner: this.state.isOwner,
                }
            })
            this.setState({
                firstname: "",
                lastname: "",
                email: "",
                password: "",
                successMsg: "Account created",
                isOwner: false,
            })
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
                            <h4>Create your yelp account</h4>
                            <div class="row">
                                <div class="form-group col-md-6">
                                    <label for="userFirstName">First name</label>
                                    <input type="text" id="userFirstName" onChange={this.firstnameChangeHandler} value={this.state.firstname} class="form-control" required></input>
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="userLastName">Last name</label>
                                    <input type="test" id="userLastName" onChange={this.lastnameChangeHandler} value={this.state.lastname} class="form-control" required></input>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="userEmailID">Email</label>
                                <input type="email" id="userEmailID" onChange={this.emailChangeHandler} value={this.state.email} class="form-control" required></input>
                            </div>
                            <div class="form-group">
                                <label for="userPassword">Password</label>
                                <input type="password" id="userPassword" onChange={this.passwordChangeHandler} value={this.state.password} class="form-control" required></input>
                            </div>
                            <div class="form-group">
                                <div class="custom-control custom-checkbox">
                                    <input type="checkbox" class="custom-control-input" id="isOwner" onChange={this.isOwnerChangeHandler} value={this.state.isOwner}></input>
                                    <label class="custom-control-label" for="isOwner">I own a restaurant</label>
                                </div>
                            </div>
                            <div class="text-center">
                                <p class="text-danger">{this.state.errMsg}</p>
                                <p class="text-success">{this.state.successMsg}</p>
                            </div>
                            <div class="form-group">
                                <input type="submit" id="userCreateAccount" onClick={this.submitCreateAccount} class="form-control bg-primary text-white" value="Create Account"></input>
                            </div>
                            <div class="panel text-center">
                                <p>or</p>
                                <p>Already have an account? <Link to="/login">Sign in</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default compose(
    graphql(createUserMutation, { name: "createUserMutation" })
)(CreateAccount)