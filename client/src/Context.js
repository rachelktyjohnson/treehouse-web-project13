import React, {useState} from "react";
import axios from "axios";
import Cookies from 'js-cookie';

const UserContext = React.createContext();


export function Provider(props) {

    const [authenticatedUser, setAuthenticatedUser] = useState(Cookies.get('authenticatedUser') || null);
    const [password, setPassword] = useState(Cookies.get('password') || null);

    const value = {
        authenticatedUser,
        password,
        actions: {
            signIn,
            signOut
        },
    };
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );

    function signIn (emailAddress, password) {
        const token = Buffer.from(`${emailAddress}:${password}`, 'utf8').toString('base64')
        axios.get("http://localhost:5000/api/users", {
            headers: {
                'Authorization': `Basic ${token}`
            }
        })
            .then((response) => {
                console.log(response.data);
                setAuthenticatedUser(response.data);
                Cookies.set('authenticatedUser', JSON.stringify(response.data), {expires: 1, sameSite: 'strict'})

                setPassword(password);
                Cookies.set('password', JSON.stringify(password), {expires: 1, sameSite: 'strict'})
                return response.data;
            })
            .catch((error) => {
                console.log('Error fetching and parsing data', error);
            })
    }

    function signOut(history){
        setAuthenticatedUser(null);
        Cookies.remove('authenticatedUser', {sameSite: 'strict'});

        setPassword(null);
        Cookies.remove('password', {sameSite: 'strict'});

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
