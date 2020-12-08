import React, { Component } from 'react'
import '../../../App.css'
import { Link } from 'react-router-dom'
import { graphql, compose } from 'react-apollo'
import { getSectionQuery, loginUserQuery } from '../../../queries/queries'
import { addSectionMutation } from '../../../mutation/mutations'

class ManageSections extends Component {

    constructor(props) {
        super(props)
        this.state = {
            AllSections: null,
            NewSectionName: "",
            errMsg: "",
            successMsg: ""
        }
    }

    NewSectionNameChangeHandler = (e) => {
        this.setState({
            NewSectionName: e.target.value
        })
    }

    IsValueEmpty = (Value) => {
        if (Value == null)
            return true
        if ("".localeCompare(Value.replace(/\s/g, "")) == 0)
            return true
        return false
    }

    updateSections = (AllSections) => {
        this.setState({
            AllSections: AllSections
        })
    }


    addSection = (e) => {
        if (this.IsValueEmpty(this.state.NewSectionName)) {
            this.setState({
                errMsg: "Section name cannot be empty",
                successMsg: ""
            })
        } else {
            this.props.addSectionMutation({
                variables: {
                    userId: localStorage.getItem("userId"),
                    sectionName: this.state.NewSectionName,
                }
            })
            this.setState({
                NewSectionName: "",
            })
        }
    }

    render() {

        var allUsersData = this.props.getSectionQuery.allUsers
        var AllSections = []
        let index
        for (index in allUsersData) {
            if (allUsersData[index].id == localStorage.getItem("userId")) {
                AllSections = allUsersData[index].restaurantInfo.sections
            }
        }

        let sectionsTable = []
        let sectionsUI = []
        var val, name
        for (val in AllSections) {
            name = AllSections[val]['name']
            sectionsUI.push(
                <tr>
                    <td scope="row">
                        <input type="text" className="form-control" value={name} disabled />
                    </td>
                </tr>)
            // <UpdateOrDeleteSection Sectionvalue={ this.state.AllSections[val] } Handler={ this.updateSections }></UpdateOrDeleteSection>
        }

        sectionsTable.push(
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Section Name</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td scope="row">
                            <input type="text" class="form-control" onChange={this.NewSectionNameChangeHandler} value={this.state.NewSectionName} />
                            <p class="text-danger text-center"> {this.state.errMsg} </p>
                            <p class="text-success text-center"> {this.state.successMsg}</p>
                        </td>
                        <td><button class="btn btn-success" onClick={this.addSection}>Add section</button></td>
                    </tr>
                    {sectionsUI}
                </tbody>
            </table>
        )

        return (
            <div class="row h-100" style={{ minHeight: 100 + "vh" }}>
                <div class="col-sm-3 pl-5 bg-info text-white">
                    <h6 class="mt-3"><Link to="/owner/menu/view" class="text-white">View menu</Link></h6>
                    <h5 class="mt-2">Manage Sections</h5>
                    <h6 class="mt-3 mb-3"><Link to="/owner/menu/manage-items" class="text-white">Manage Items</Link></h6>
                </div>
                <div class="col-sm-9">
                    <div class="mt-3">
                        {sectionsTable}
                    </div>
                </div>
            </div>
        )
    }
}
export default compose(
    graphql(getSectionQuery, { name: "getSectionQuery" }),
    graphql(addSectionMutation, { name: "addSectionMutation" }),
)(ManageSections)