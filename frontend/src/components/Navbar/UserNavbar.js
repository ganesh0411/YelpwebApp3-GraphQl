import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Redirect} from 'react-router';

class UserNavbar extends Component {
    constructor(props) {
        super(props)
        this.username = ""  
        this.redirectVar = ""      
        this.state = {
            searchByItem : ""
        }
    }

    IsValueEmpty = (Value) => {
        if (Value === null)
            return true;
        if ("".localeCompare(Value.replace(/\s/g, "")) === 0) 
            return true;
        return false;
    }
    

    searchByItemChangeHandler = (e) => {
        this.setState({
            searchByItem : e.target.value
        })

    }
    
    searchRestaurantsOfferingItem = (e) => {
        if (this.IsValueEmpty(this.state.searchByItem)){
            this.errMsg = "Please enter a item to be searched";
        } else {
            this.redirectVar = <Redirect to={ "/user/search?item=" + this.state.searchByItem }></Redirect>
        }
    }

    // getUserName = () => {
    //     return this.username;
    // }

    // setUserName = (name) => {
    //     this.username = name;
    // }

    render(){
        
        if (!localStorage.getItem("isOwner")){
            this.redirectVar = <Redirect to= "/welcome"/>;
        } else if (localStorage.getItem("isOwner") === "true"){
            this.redirectVar = <Redirect to= "/owner/home"/>;
        } else {
            this.username = localStorage.getItem("userName")
        }
        return(
            <div style={{marginBottom : 70 + "px"}}>
                { this.redirectVar }
                <nav class="navbar navbar-expand-sm fixed-top bg-white shadow">
                    <a class="navbar-brand display-4" href="/"><strong>Yelp</strong></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="navbar-collapse collapse" id="navbarNavDropdown">
                        <ul class="navbar-nav mr-auto">
                        </ul>
                        <ul class="nav navbar-nav">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Hi, {this.username}!
                                </a>
                                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                    <div class="row">
                                        <Link class="dropdown-item" to="/user/account/profile">Edit Account</Link>
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
//export UserNavbar Component
export default UserNavbar;