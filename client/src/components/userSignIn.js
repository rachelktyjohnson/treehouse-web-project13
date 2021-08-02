import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';

export default function UserSignIn({context}) {

    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    //redirect if already logged in
    if(context.authenticatedUser){
        history.push('/');
    }
    async function handleSubmit(e){
        e.preventDefault();
        await context.actions.signIn(email, password);
        history.push('/');
    }

    return(
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>

                <form>
                    <label htmlFor="emailAddress">Email Address</label>
                    <input id="emailAddress"
                           name="emailAddress"
                           type="email"
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                    />

                    <label htmlFor="password">Password</label>
                    <input id="password"
                           name="password"
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                    />

                    <button className="button" type="submit" onClick={handleSubmit}>Sign In</button>
                    <Link className="button button-secondary" to="/">Cancel</Link>
                </form>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>

            </div>
        </main>
    )
}
