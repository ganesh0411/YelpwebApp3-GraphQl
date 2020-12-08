import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../../App.css';

class OwnerHome extends Component {
    
    render(){
        return(
            <div class="container mt-5 text-center">
                <div class="display-4 mb-5">What would you like to do?</div>
                <div class="row m-5 form-group">
                    <div class="col-md-6"><Link to="/owner/account/profile"><button class="btn btn-primary form-control p-5"><h3>Profile settings</h3></button></Link></div>
                    <div class="col-md-6"><Link to="/owner/account/restaurant-location"><button class="btn btn-primary form-control p-5"><h3>Restaurant info</h3></button></Link></div>
                </div>
                <div class="row m-5 form-group">
                    <div class="col-md-6"><Link to="/owner/menu/manage-items"><button class="btn btn-primary form-control p-5"><h3>Manage menu</h3></button></Link></div>
                    <div class="col-md-6"><Link to="/owner/menu/view"><button class="btn btn-primary form-control p-5"><h3>View menu</h3></button></Link></div>
                </div>
            </div>
        )
    }
}
//export OwnerHome Component
export default OwnerHome;