import { gql } from 'apollo-boost'

const loginUserQuery = gql`
{
    allUsers {
        id
        email
        password
        isOwner
        firstname
    }
}
`
const getSectionQuery = gql`
{
    allUsers {
        id
        restaurantInfo{
        sections{
            id
            name
          }
        }
    }
}
`
const getItemQuery = gql`
{
    allUsers {
        id
        restaurantInfo{
            name
            cuisine
            sections{
                id
                name
                items {
                    id
                    name
                    description
                    price
                }
            }
        }
    }
}
`
const getRestaurants = gql`
{
    allUsers {
        id
      	isOwner
        restaurantInfo{
          name
          cuisine
        }
    }
}
`
const getProfile = gql`
{
    allUsers {
        id
        email
        firstname
        lastname
        password
      	isOwner
    }
}
`
export {
    loginUserQuery,
    getSectionQuery,
    getItemQuery,
    getRestaurants,
    getProfile,
}