import './App.css';
import axios from 'axios';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/header';
import Courses from './components/courses';
import CourseDetail from './components/courseDetail';
import UserSignIn from './components/userSignIn';
import UserSignUp from './components/userSignUp';

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
                        <Route exact path="/courses/:id" component={CourseDetail} />
                        <Route exact path="/signin" component={UserSignIn} />
                        <Route exact path="/signup" component={UserSignUp} />
                    </Switch>
            </Router>
        </div>
    );
}

export default App;
