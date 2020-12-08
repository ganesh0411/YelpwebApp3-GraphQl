import React, { Component } from 'react'
import '../../../App.css'
import { Link } from 'react-router-dom'
import passwordHash from 'password-hash'
import { graphql, compose } from 'react-apollo'
import { getProfile } from '../../../queries/queries'
import { updateProfileMutation } from '../../../mutation/mutations'

class OwnerProfileClass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userDetails: null,
            userid: null,
            firstname: null,
            lastname: null,
            email: null,
            image: null,
            newPassword: "",
            confirmPassword: "",
            currentPassword: null,
            doNewPasswordsMatch: true,
            errMsg: "",
            successMsg: "",
            shouldUpdate: true
        }
        this.redirectVar = ""
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

    IsValidImage = (Image) => {
        if (Image === null) {
            return true
        }
        if (Image.name === null) {
            return true
        }
        if (Image.name.match(/^.*\.jpg$/)) {
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

    imageChangeHandler = (e) => {
        if (!this.IsValidImage(e.target.files[0])) {
            this.setState({
                image: e.target.files[0]
            })
        } else {
            var newImage = new File([e.target.files[0]], 'Image' + this.state.userid + '.jpg', { type: 'image/jpeg' })
            this.setState({
                image: newImage
            })
        }
    }

    newPasswordChangeHandler = (e) => {
        this.setState({
            newPassword: e.target.value,
        })
    }

    confirmPasswordChangeHandler = (e) => {
        this.setState({
            confirmPassword: e.target.value,
        })
    }

    currentPasswordChangeHandler = (e) => {
        this.setState({
            currentPassword: e.target.value
        })
    }

    isCurrentPasswordCorrect() {
        // if (passwordHash.verify(this.state.newPassword, this.state.userDetails.confirmPassword)) {
        if (this.state.newPassword === this.state.confirmPassword) {
            return true
        }
        return false
    }

    updateProfileDetails = (e) => {
        e.preventDefault()
        if (this.IsValueEmpty(this.state.email) || this.IsValueEmpty(this.state.firstname) || this.IsValueEmpty(this.state.lastname)) {
            this.setState({
                errMsg: "Required fields cannot be empty",
                successMsg: ""
            })
        } else if (!this.IsValidEmailID(this.state.email)) {
            this.setState({
                errMsg: "Sorry! Email ID has to be of the format name@domain.xyz",
                successMsg: ""
            })
        } else if (!this.isCurrentPasswordCorrect()) {
            this.setState({
                errMsg: "New password do not match",
                successMsg: ""
            })
        } else if (!this.IsValidName(this.state.firstname) || !this.IsValidName(this.state.lastname)) {
            this.setState({
                errMsg: "Name has to contain only alphabets",
                successMsg: ""
            })
        // } else if (!this.IsValidImage(this.state.image)) {
        //     this.setState({
        //         errMsg: "Invalid image type. Please upload jpg file",
        //         successMsg: ""
        //     })
        } else if (this.state.doNewPasswordsMatch) {
            const userData = {
                userId: localStorage.getItem("userId"),
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                email: this.state.email,
                lastname: this.state.lastname,
                password: this.state.newPassword === "" ? this.state.password : passwordHash.generate(this.state.newPassword)
            }
            this.props.updateProfileMutation({
                variables: userData
            })

            this.setState({
                newPassword: "",
                confirmPassword: "",
                currentPassword: "",
                errMsg: "",
                image: null,
                successMsg: "Profile updated!"
            })
        }
    }

    render() {

        var restaurantDetails = this.props.getProfile.allUsers
        var index
        if(this.state.shouldUpdate) {
            for (index in restaurantDetails) {
                if (restaurantDetails[index].id === localStorage.getItem("userId")) {
                    this.setState({
                        firstname: restaurantDetails[index].firstname,
                        lastname: restaurantDetails[index].lastname,
                        email: restaurantDetails[index].email,
                        password: restaurantDetails[index].password,
                        shouldUpdate: false,
                    })
                }
            }
        }

        return (
            <div class="row h-100">
                <div class="col-sm-3 pl-5 bg-info text-white" style={{ minHeight: 90 + "vh" }}>
                    <h2 class="mt-5">Your account</h2>
                    <h5 class="mt-3">Profile</h5>
                    <h6 class="mt-2"><Link to="/owner/account/restaurant-location" class="text-white">Restaurant location</Link></h6>
                </div>
                <div class="col-sm-9 p-5">
                    <h4>Personal info</h4>
                    <p>* Required fields</p>
                        <div class="form-group">
                            <label for="userFirstName">First name *</label>
                            <input type="text" id="userFirstName" name="userFirstName" class="form-control" onChange={this.firstnameChangeHandler} value={this.state.firstname} required></input>
                        </div>
                        <div class="form-group">
                            <label for="userLastName">Last name *</label>
                            <input type="text" id="userLastName" name="userLastName" class="form-control" onChange={this.lastnameChangeHandler} value={this.state.lastname} required></input>
                        </div>
                        <div class="form-group">
                            <label for="userEmailID">Email address *</label>
                            <input type="email" id="userEmailID" name="userEmailID" class="form-control" onChange={this.emailChangeHandler} value={this.state.email} required></input>
                        </div>
                        {/* <div class="form-group">
                            <label for="userProfileImage">Profile image</label>
                            <input type="file" id="userProfileImage" name="userProfileImage" class="custom-file" onChange={this.imageChangeHandler}></input>
                        </div> */}
                        <h4>Change Password</h4>
                        <p>Leave both the fields blank to not change password</p>
                        <div className="row">
                            <div class="form-group col-md-6">
                                <label for="userNewPassword">New password</label>
                                <input type="password" id="userNewPassword" name="userNewPassword" class="form-control" onChange={this.newPasswordChangeHandler} value={this.state.newPassword}></input>
                            </div>
                            <div class="form-group col-md-6">
                                <label for="userConfirmNewPassword">Confirm new password</label>
                                <input type="password" id="userConfirmNewPassword" name="userConfirmNewPassword" class="form-control" onChange={this.confirmPasswordChangeHandler} value={this.state.confirmPassword}></input>
                            </div>
                        </div>
                        <p class="text-danger"> {this.state.doNewPasswordsMatch ? "" : "Passwords do not match"}</p>
                        {/* <h4>Confirm and update</h4>
                        <p>Enter current password to confirm updates</p>
                        <div class="form-group">
                            <label for="userCurrentPassword">Current password</label>
                            <input type="password" id="userCurrentPassword" name="userCurrentPassword" class="form-control" onChange={this.currentPasswordChangeHandler} value={this.state.currentPassword}></input>
                        </div> */}
                        <div class="text-center">
                            <p class="text-success"> {this.state.successMsg} </p>
                            <p class="text-danger"> {this.state.errMsg} </p>
                        </div>
                        <div class="form-group">
                            <button class="form-control bg-primary text-white" onClick={this.updateProfileDetails}> Update profile </button>
                        </div>
                </div>
            </div>
        )
    }
}


export default compose(
    graphql(updateProfileMutation, { name: "updateProfileMutation" }),
    graphql(getProfile, { name: "getProfile" }),
)(OwnerProfileClass)