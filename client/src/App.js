import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import './App.css';

import Header from './components/header';
import Courses from './components/courses';
import CreateCourse from "./components/createCourse";
import UpdateCourse from "./components/updateCourse";
import CourseDetail from './components/courseDetail';
import UserSignIn from './components/userSignIn';
import UserSignUp from './components/userSignUp';
import UserSignOut from "./components/userSignOut";
import NotFound from "./components/notFound";
import Forbidden from "./components/forbidden";
import UnhandledError from "./components/unhandledError";

import withContext from './Context';

const HeaderWithContext = withContext(Header);

function App() {
    return (
        <div id="root">
            <Router>
                <HeaderWithContext/>
                <Switch>
                    <Route exact path="/" component={withContext(Courses)} />
                    <Route exact path="/courses/create" component={withContext(CreateCourse)} />
                    <Route exact path="/courses/:id/update" component={withContext(UpdateCourse)} />
                    <Route exact path="/courses/:id" component={withContext(CourseDetail)} />
                    <Route exact path="/signin" component={withContext(UserSignIn)} />
                    <Route exact path="/signup" component={withContext(UserSignUp)} />
                    <Route exact path="/signout" component={withContext(UserSignOut)} />

                    <Route exact path="/notfound" component={withContext(NotFound)} />
                    <Route exact path="/forbidden" component={withContext(Forbidden)} />
                    <Route exact path="/error" component={withContext(UnhandledError)} />
                    <Route component={NotFound}/>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
