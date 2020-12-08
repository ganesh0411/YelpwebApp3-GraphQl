import React, {Component} from 'react'
import '../../../App.css'
import {Link} from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { getItemQuery } from '../../../queries/queries'

class ViewMenu extends Component {

    constructor(props) {
        super (props)
        this.state = {
            AllItems : [],
            NewSectionName : "",
            NewItemName : "",
            errMsg : "",
            successMsg : ""
        }
        this.SectionValue = null
    }

    render(){

        var allUsersData = this.props.getItemQuery.allUsers
        var AllSections = []
        let index
        for (index in allUsersData) {
            if (allUsersData[index].id == localStorage.getItem("userId")) {
                AllSections = allUsersData[index].restaurantInfo.sections
            }
        }

        var Sections = []
        var Items = []
        var section, item
        if (AllSections.length == 0) {
            Sections.push(
                <div class="col-sm-12">
                    <h3>Oops! Looks like there are no sections present in your restaurant menu. <Link to="/owner/menu/manage-sections">Add here</Link></h3>
                </div>
            )
        } else {
            for (section in AllSections) {
                Items = []
                for (item in AllSections[section].items) {
                        Items.push(
                            <div class="row p-3 shadow" id="restaurant-display-card-1">
                                {/* <div class="col-sm-3 align-center">
                                    <DisplayImage type="Item" imageid={ this.state.AllItems[item]['itemid'] } />
                                </div> */}
                                <div class="col-sm-9 offset-sm-1">
                                    <h3>{ AllSections[section].items[item]['name'] }</h3>
                                    <h6>{ AllSections[section].items[item]['description'] }</h6>
                                    <p>$ { AllSections[section].items[item]['price'] }</p>

                                </div>
                            </div>   
                        )
                }

                if (Items.length > 0){
                    Sections.push(
                        <div class="row p-3 mt-3 mb-3">
                            <div class="col-sm-12">
                                <h3>{ AllSections[section]['name'] }</h3>                                
                                { Items }
                            </div>
                        </div>
                    )
                }
            }
            if(Sections.length == 0) {
                Sections.push(
                    <div class="row p-3 mt-3 mb-3">
                        <div class="col-sm-12">
                    <h3>Oops! Looks like there are no items present in your restaurant menu. <Link to="/owner/menu/manage-items">Add here</Link></h3>
                        </div>
                    </div>
                )
            }
        }
        return(
            <div class="row h-100" style={{ minHeight: 100 + "vh" }}>
            <div class="col-sm-3 pl-5 bg-info text-white">
                <h5 class="mt-2">View menu</h5>
                <h6 class="mt-3 mb-3"><Link to="/owner/menu/manage-sections" class="text-white">Manage sections</Link></h6>
                <h6 class="mt-3"><Link to="/owner/menu/manage-items" class="text-white">Manage items</Link></h6>
            </div>
            <div class="col-sm-9">
                <div class="container">
                    { Sections }
                </div>                
            </div>
        </div>
        )
    }
}
//export ViewMenu Component
export default compose(
    graphql(getItemQuery, { name: "getItemQuery" }),
)(ViewMenu)