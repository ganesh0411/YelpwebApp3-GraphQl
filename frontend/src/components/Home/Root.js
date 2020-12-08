import React, {Component} from 'react';
import '../../App.css';
import {Redirect} from 'react-router';

class Home extends Component {
    
    render(){
        
        var RedirectVar = "";
        console.log("URL", this.props.location.pathname);
        if (this.props.location.pathname === "/"){
            RedirectVar = <Redirect to= "/welcome"/>
        }
        return(
            <div>
                { RedirectVar }
            </div>
        )
    }
}
//export Home Component
export default Home;