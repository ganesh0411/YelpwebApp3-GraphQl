import React, {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import {Redirect} from 'react-router'

import Home from './Home/Home'
import Root from './Home/Root'

import Login from './Login/Login'
import CreateAccount from './Login/CreateAccount'
import Logout from './Login/Logout'

import UserNavBar from './Navbar/UserNavbar'
import UserHome from './User/UserHome'
import RestaurantInfo from './User/RestaurantDetails'

import OwnerNavBar from './Navbar/OwnerNavbar'
import OwnerHome from './Owner/OwnerHome'
import ManageSections from './Owner/Menu/ManageSections'
import ManageItems from './Owner/Menu/ManageItems'
import OwnerViewMenu from './Owner/Menu/ViewMenu'
import RestaurantDetails from './Owner/Account/RestaurantLocation'

import ProfileSettings from './Owner/Account/OwnerProfile'
import UserProfileSettings from './User/Account/UserProfile'

//Create a Main Component
class Main extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route*/}

                {/* Routes for user without account */}
                <Route path="/" component={Root}/>
                <Route path="/welcome" exact={true} component={Home}/>

                <Route path="/login" exact={true} component={Login} />
                <Route path="/logout" exact={true} component={Logout} />
                <Route path="/create-account" exact={true} component={CreateAccount} />

                <Route path="/user" component={UserNavBar} />
                <Route path="/user/home" component={UserHome} />
                <Route path="/user/restaurant-details/:id" component={RestaurantInfo} />
                <Route path="/user/account/profile" component={UserProfileSettings} />

                
                <Route path="/owner" component={OwnerNavBar} />
                <Route path="/owner/home" component={OwnerHome} />
                <Route path="/owner/menu/manage-sections" component={ManageSections} />
                <Route path="/owner/menu/manage-items" component={ManageItems} />
                <Route path="/owner/menu/view" component={OwnerViewMenu} />
                <Route path="/owner/account/restaurant-location" component={RestaurantDetails} />
                <Route path="/owner/account/profile" component={ProfileSettings} />

            </div>
        )
    }
}
//Export The Main Component
export default Main