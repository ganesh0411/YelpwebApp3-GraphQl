import React, {Component} from 'react'
import '../../App.css'
import { graphql, compose } from 'react-apollo'
import { getItemQuery } from '../../queries/queries'

class UserRestaurantDetails extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            RestaurantDetails : [],
            AllSections : [],
            AllItems : []
        }
    }
    
    render(){

        var allUsersData = this.props.getItemQuery.allUsers
        var AllSections = []
        var RestaurantDetails = {}
        let index
        for (index in allUsersData) {
            if (allUsersData[index].id === this.props.match.params.id) {
                console.log(allUsersData[index].restaurantInfo)
                AllSections = allUsersData[index].restaurantInfo.sections
                RestaurantDetails['name'] = allUsersData[index].restaurantInfo.name
                RestaurantDetails['cuisine'] = allUsersData[index].restaurantInfo.cuisine
            }
        }
        var DisplayRestaurantDetails = []
        var DisplaySectionDetails = []
        var DisplayItemsDetails = []
        var item, section

        if ( AllSections.length === 0) {
            DisplayRestaurantDetails.push(
                <div class="row m-3">
                    <div class="col-sm-12">
                            <h3 class="display-4">Oops! There seems to be an error. The restaurant you are looking for does not exist. Please try again</h3>
                    </div>
                </div>
            )
        } else {
            DisplayRestaurantDetails.push(
                <div class="row m-3">
                    <div class="col-sm-12">
                        <a href={"/user/restaurant-details/" + this.props.match.params.id}><h3 class="display-4">{ RestaurantDetails['name'] }</h3></a>
                        <h5>Cuisine : { RestaurantDetails['cuisine'] }</h5>
                        {/* <h5>Address : { this.state.RestaurantDetails[0]['address'] }, { this.state.RestaurantDetails[0]['zipcode'] }</h5>
                        <p>Phone number : { this.state.RestaurantDetails[0]['phno'] }</p> */}
                    </div>
                </div>
            )

            for (section in AllSections) {
                DisplayItemsDetails = []
                for (item in AllSections[section].items) {
                        DisplayItemsDetails.push(
                            // <MenuCard ItemInfo={ this.state.AllItems[item] }></MenuCard>
                            <div class="row p-3 shadow" id="restaurant-display-card-1">
                            {/* <div class="col-sm-3 align-center">
                                <DisplayImage type="Item" imageid={ this.state.AllItems[item]['itemid'] } />
                            </div> */}
                            <div class="col-sm-9 offset-sm-1">
                                <h4>{ AllSections[section].items[item]['name'] }</h4>
                                <h6>{ AllSections[section].items[item]['description'] }</h6>
                                <p>$ { AllSections[section].items[item]['price'] }</p>

                            </div>
                        </div>  
                        )
                }
                if (DisplayItemsDetails.length > 0) {
                    DisplaySectionDetails.push(
                        <div class="row p-3 mt-3 mb-3">
                            <div class="col-sm-12">
                                <h2>{ AllSections[section]['name'] }</h2>

                                { DisplayItemsDetails }
                            </div>
                        </div>
                    )
                }
            }    
            // }
        }

        return(
            <div class="container">

            { DisplayRestaurantDetails }

            { DisplaySectionDetails }
            
        </div>
    
        )
    }
}

//export UserRestaurantDetails Component
export default compose(
    graphql(getItemQuery, { name: "getItemQuery" }),
)(UserRestaurantDetails)