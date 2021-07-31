import React from 'react';
import {Link} from 'react-router-dom';

export default class userSignUp extends React.Component {
    render() {
        return(
            <main>
                <div className="form--centered">
                    <h2>Sign Up</h2>

                    <form>
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" name="firstName" type="text" value=""/>

                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" name="lastName" type="text" value=""/>

                        <label htmlFor="emailAddress">Email Address</label>
                        <input id="emailAddress" name="emailAddress" type="email" value=""/>

                        <label htmlFor="password">Password</label>
                        <input id="password" name="password" type="password" value=""/>

                        <button className="button" type="submit">Sign Up</button>
                        <Link className="button button-secondary" to="/">Cancel </Link>
                    </form>
                    <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
                </div>
            </main>
        )
    }
}
