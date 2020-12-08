import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {Redirect} from 'react-router'



class Home extends Component {

    render(){

        var redirectVar
        if (localStorage.getItem('isOwner') === "false") {
            redirectVar = <Redirect to="/user/home" />
        } else if (localStorage.getItem('isOwner') === "true") {
            redirectVar = <Redirect to="/owner/home" />
        }

        return(
            <div class="row" style={{ minHeight: 100 + "vh"}}>
                { redirectVar }
                <div class="col-lg-6 bg-info pt-5 pl-5 shadow text-center">
                    <p class="display-2">YELP</p>
                </div>
                <div class="col-sm-6">
                <p class="display-2">Restaurant and User registration</p>
                    <h6> Click on sign in to further continue</h6>
                    <h4 class="text-right pr-5 pt-5"><Link to="/login">Sign in</Link></h4>
                </div>
            </div>
            // <div>
            //     <nav class="navbar navbar-expand-sm bg-danger navbar-dark fixed-top">
	        //     <div class="container">
            //     <div class="collapse navbar-collapse" id="navbarResponsive">
            //     <img src={logo} style={{height: "44px"}}/>
            //     <ul class="navbar-nav ml-auto">
            //     <li class="nav-item"><Link to="/UserLogin"><button type="button" class="btn btn-danger" id = "userLogin">User Login</button></Link></li>
            //     <li class="nav-item"><Link to="/UserSignUp"><button type="button" class="btn btn-danger" id = "userSignUp">User Signup</button></Link></li>
            //     </ul>
            //     </div>
	        //     </div>
	        //     </nav>
            //     <nav class="navbar navbar-expand-sm bg-danger navbar-dark fixed-bottom">
	        //     <div class="container">
            //     <div class="collapse navbar-collapse" id="navbarResponsive">
            //     <ul class="navbar-nav ml-auto">
            //     <li class="nav-item"><Link to="/OwnerLogin"><button type="button" class="btn btn-danger" id = "ownerLogin">Restaurant Login</button></Link></li>
            //     <li class="nav-item"><Link to="/OwnerSignUp"><button type="button" class="btn btn-danger" id = "ownerSignUp">Restaurant Signup</button></Link></li>
            //     </ul>
            //     </div>
	        //     </div>
	        //     </nav>
            // </div>
        )
    }
}
//export Home Component
export default Home