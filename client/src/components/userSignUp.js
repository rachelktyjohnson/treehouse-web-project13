import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Loading from "./loading";
import axios from 'axios';

export default function UserSignUp(props) {

    const {context} = props;
    let history = useHistory();

    //redirect if already logged in
    if(context.authenticatedUser){
        history.push('/');
    }

    //set state using hooks
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    //runs when the form is submitted
    function handleSubmit(e){
        setIsLoading(true);
        e.preventDefault()
        //makes post call to api to create the new user
        axios.post('http://localhost:5000/api/users', {
            firstName: firstName,
            lastName: lastName,
            emailAddress: email,
            password: password
        })
            .then((response)=>{
                context.actions.signIn(email, password)
                    .then(()=>{
                        history.push('/');
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.log('Error fetching and parsing data', error)
                        if (error.response.status===401){
                            history.push('/forbidden');
                        } else if (error.response.status===500){
                            history.push('/error');
                        }
                    })
            })
            .catch(error => {
                setIsLoading(false);
                console.log('Error fetching and parsing data', error);
                setErrors(error.response.data.errors);
            })
    }

    if (isLoading){
        return (
            <Loading/>
        )
    } else {
        return (
            <main>
                <div className="form--centered">
                    <h2>Sign Up</h2>
                    {errors.length > 0 ? (
                        <div className="validation--errors">

                            <h3>Validation Errors</h3>
                            <ul>
                                {errors.map((error, index) => (
                                    <li key={index}>{error}</li>
                                ))}
                            </ul>
                        </div>
                    ) : ""}
                    <form>
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName"
                               name="firstName"
                               type="text"
                               value={firstName}
                               onChange={(e) => setFirstName(e.target.value)}
                        />

                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName"
                               name="lastName"
                               type="text"
                               value={lastName}
                               onChange={(e) => setLastName(e.target.value)}
                        />

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

                        <button className="button" type="submit" onClick={handleSubmit}>Sign Up</button>
                        <Link className="button button-secondary" to="/">Cancel </Link>
                    </form>
                    <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
                </div>
            </main>
        )
    }
}
