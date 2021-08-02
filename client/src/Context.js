import React from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const UserContext = React.createContext();

export class Provider extends React.Component {

    state = {
        authenticatedUser: Cookies.get('authenticatedUser') || null,
        password: Cookies.get('password') || null
    }

    constructor() {
        super();
    }

    render() {
        const { authenticatedUser } = this.state;
        const { password } = this.state;
        const value = {
            authenticatedUser,
            password,
            actions: {
                signIn: this.signIn,
                signOut: this.signOut
            },
        };
        return (
            <UserContext.Provider value={value}>
                {this.props.children}
            </UserContext.Provider>
        );
    }

    signIn = (emailAddress, password) => {
        const token = Buffer.from(`${emailAddress}:${password}`, 'utf8').toString('base64')
        axios.get("http://localhost:5000/api/users", {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                this.setState(() => {
                    return {authenticatedUser: response.data}
                })
                Cookies.set('authenticatedUser', JSON.stringify(response.data), {expires: 1})

                this.setState(() => {
                    return {password: password}
                })
                Cookies.set('password', JSON.stringify(password), {expires: 1})
                return response.data;
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            })
    }

    signOut = () => {
        this.setState(() => {
            return {authenticatedUser: null}
        })
        Cookies.remove('authenticatedUser');

        this.setState(() => {
            return {password: null}
        })
        Cookies.remove('password');
    }
}


export const Consumer = UserContext.Consumer;


export default function withContext(Component) {
    return function ContextComponent(props) {
        return (
            <Consumer>
                {context => <Component {...props} context={context} />}
            </Consumer>
        );
    }
}
