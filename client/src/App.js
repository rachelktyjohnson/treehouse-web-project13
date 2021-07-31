import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/header';
import Courses from './components/courses';
import CreateCourse from "./components/createCourse";
import UpdateCourse from "./components/updateCourse";
import CourseDetail from './components/courseDetail';
import UserSignIn from './components/userSignIn';
import UserSignUp from './components/userSignUp';
import UserSignOut from "./components/userSignOut";

function App() {

    axios.get('http://localhost:5000/api/courses')
        .then(response => {
            console.log(response.data);
        })

    return (
        <div id="root">
            <Router>
                <Header/>
                    <Switch>
                        <Route exact path="/" component={Courses} />
                        <Route exact path="/courses/create" component={CreateCourse} />
                        <Route exact path="/courses/:id/update" component={UpdateCourse} />
                        <Route exact path="/courses/:id" component={CourseDetail} />
                        <Route exact path="/signin" component={UserSignIn} />
                        <Route exact path="/signup" component={UserSignUp} />
                        <Route exact path="/signout" component={UserSignOut} />
                    </Switch>
            </Router>
        </div>
    );
}

export default App;
