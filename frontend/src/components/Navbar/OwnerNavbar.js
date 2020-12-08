import React, {Component} from 'react'
import {Redirect} from 'react-router'
import {Link} from 'react-router-dom'

class OwnerNavbar extends Component {
    constructor(props) {
        super(props)
        this.redirectVar = ""
        this.username = ""
    }

    render(){
        
        if (!localStorage.getItem("isOwner")){
            this.redirectVar = <Redirect to= "/welcome"/>
        } else if (localStorage.getItem("isOwner") === "false"){
            this.redirectVar = <Redirect to= "/user/home"/>
        } 
        else {
            this.username = localStorage.getItem("userName")
        }
        return(
            <div style={{marginBottom : 70 + "px"}}>
                { this.redirectVar }
                <nav class="navbar navbar-expand-sm fixed-top bg-white shadow">
                    <a class="navbar-brand display-4" href="/"><strong>Yelp </strong></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="navbar-collapse collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav mr-auto">
                        </ul>
                        <ul class="nav navbar-nav">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Hi, Owner Name!
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <div class="row">
                                        <Link class="dropdown-item" to="/owner/menu/view">Manage Menu</Link>
                                        <Link class="dropdown-item" to="/owner/account/restaurant-location">Manage Restaurant</Link>
                                        <Link class="dropdown-item" to="/owner/account/profile">Edit Profile</Link>
                                        <Link class="dropdown-item" to="/logout">Logout</Link>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>

        )
    }
}
//export OwnerNavbar Component
export default OwnerNavbar