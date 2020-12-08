import React, { Component } from 'react'
import '../../../App.css'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { getRestaurants } from '../../../queries/queries'
import { restaurantInfoMutation } from '../../../mutation/mutations'

class RestaurantLocationClass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userid: null,
            restaurantid: null,
            name: "",
            cuisine: "",
            address: "",
            image: "",
            zipcode: "",
            phno: "",
            errMsg: "",
            successMsg: "",
            shouldUpdate: true,
        }
    }

    nameChangeHandler = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    cusineChangeHandler = (e) => {
        this.setState({
            cuisine: e.target.value
        })
    }

    addressChangeHandler = (e) => {
        this.setState({
            address: e.target.value
        })
    }

    imageChangeHandler = (e) => {
        if (!this.IsValidImage(e.target.files[0])) {
            this.setState({
                image: e.target.files[0]
            })
        } else {
            var newImage = new File([e.target.files[0]], 'Image' + this.state.restaurantid + '.jpg', { type: 'image/jpeg' })
            this.setState({
                image: newImage
            })
        }
    }

    zipcodeChangeHandler = (e) => {
        this.setState({
            zipcode: e.target.value
        })
    }

    phnoChangeHandler = (e) => {
        this.setState({
            phno: e.target.value
        })
    }

    IsValueEmpty = (Value) => {
        if (Value === null || Value === undefined || Value === "")
            return true
        if ("".localeCompare(toString(Value).replace(/\s/g, "")) === 0)
            return true
        return false
    }

    IsValidphno = (phno) => {
        if (phno.match(/^[(][0-9]{3}[)][ ]+[0-9]{3}[-][0-9]{4}$/)) {
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

    updateRestaurantDetails = (e) => {
        e.preventDefault()
        if (this.IsValueEmpty(this.state.name) || this.IsValueEmpty(this.state.cuisine)) {
            this.setState({
                errMsg: "Required fields cannot be empty",
                successMsg: ""
            })
        } else {
            this.props.restaurantInfoMutation({
                variables: {
                    userId: localStorage.getItem("userId"),
                    name: this.state.name,
                    cuisine: this.state.cuisine,
                }
            })
            this.setState({
                errMsg: "",
                successMsg: "Updated successfully"
            })
        }
    }

    render() {

        var restaurantDetails = this.props.getRestaurants.allUsers
        let restaurantName = ""
        let restaurantCuisine = ""
        var index
        if(this.state.shouldUpdate) {
            for (index in restaurantDetails) {
                if (restaurantDetails[index].id == localStorage.getItem("userId")) {
                    restaurantName = restaurantDetails[index].restaurantInfo.name
                    restaurantCuisine = restaurantDetails[index].restaurantInfo.cuisine
                    this.setState({
                        name: restaurantDetails[index].restaurantInfo.name,
                        cuisine: restaurantDetails[index].restaurantInfo.cuisine,
                        shouldUpdate: false,
                    })
                }
            }
        }

        return (
            <div>
                <div class="row h-100">
                    <div class="col-sm-3 pl-5 bg-info text-white" style={{ minHeight: 90 + "vh" }}>
                        <h2 class="mt-5">Your account</h2>
                        <h6 class="mt-2"><Link to="/owner/account/profile" class="text-white">Profile</Link></h6>
                        <h5 class="mt-3">Restaurant location</h5>
                    </div>
                    <div class="col-sm-9 p-5">
                        <h4 class="border-bottom">Manage Restaurant location</h4>
                        <p>* Required fields</p>
                        <div>
                            <div class="w-50">
                                <label for="restaurantName">Restaurant name *</label>
                                <input type="text" id="restaurantName" name="restaurantName" class="form-control" placeholder="e.g. My awesome cafe" onChange={this.nameChangeHandler} value={this.state.name} required />
                            </div>
                            <div class="w-50">
                                <label for="restaurantCuisine">Cuisine *</label>
                                <input type="text" id="restaurantCuisine" name="restaurantCuisine" class="form-control" placeholder="e.g. Indian, Mexican" onChange={this.cusineChangeHandler} value={this.state.cuisine} required />
                            </div>
                        </div>
                        <div class="text-center">
                            <p class="text-success"> {this.state.successMsg} </p>
                            <p class="text-danger"> {this.state.errMsg} </p>
                        </div>
                        <div class="form-group">
                            <button type="submit" class="form-control btn btn-primary" onClick={this.updateRestaurantDetails}>Update</button>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default compose(
    graphql(restaurantInfoMutation, { name: "restaurantInfoMutation" }),
    graphql(getRestaurants, { name: "getRestaurants" }),
)(RestaurantLocationClass)