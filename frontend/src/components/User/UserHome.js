import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';
import { graphql, compose } from 'react-apollo'
import { getRestaurants } from '../../queries/queries'

class UserHome extends Component {

    constructor(props){
        super(props);
        this.state = {
            allRestaurants : []
        }
    }

    render(){

        var allUsersData = this.props.getRestaurants.allUsers
        var RestaurantsUI = [];
        var val;
        for (val in allUsersData){
            if(allUsersData[val].isOwner === true) {
                RestaurantsUI.push(
                    <div class="row m-3 shadow" id="restaurant-display-card">
                        {/* <div class="col-sm-3 align-center">
                            <DisplayImage type="Restaurant" imageid={ this.state.allRestaurants[val]['restaurantid'] } />
                        </div> */}
                        <div class="col-sm-9">
                            <Link to={ "/user/restaurant-details/" + allUsersData[val]['id']}><h3 class="display-4">{ allUsersData[val].restaurantInfo.name }</h3></Link>
                            <h5>Cuisine : { allUsersData[val].restaurantInfo.cuisine }</h5>
                            {/* <h5>Location : { this.state.allRestaurants[val]['address'] } , { this.state.allRestaurants[val]['zipcode'] }</h5>
                            <p>Phone number : { this.state.allRestaurants[val]['phno'] }</p>     */}
                        </div>
                    </div>
                )
            }
        }

        // var redirectVar = <Redirect to= "/welcome"/>;
        return(
            <div>

                { RestaurantsUI }

            </div>
        )
    }
}
//export UserHome Component
export default compose(
    graphql(getRestaurants, { name: "getRestaurants" }),
)(UserHome)