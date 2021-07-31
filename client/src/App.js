import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Header from './components/header';
import Courses from './components/courses';
import CreateCourse from "./components/createCourse";
import UpdateCourse from "./components/updateCourse";
import CourseDetail from './components/courseDetail';
import DeleteCourse from'./components/deleteCourse';
import UserSignIn from './components/userSignIn';
import UserSignUp from './components/userSignUp';
import UserSignOut from "./components/userSignOut";
import NotFound from "./components/notFound";
import Forbidden from "./components/forbidden";
import UnhandledError from "./components/unhandledError";

function App() {

    return (
        <div id="root">
            <Router>
                <Header/>
                    <Switch>
                        <Route exact path="/" component={Courses} />
                        <Route exact path="/courses/create" component={CreateCourse} />
                        <Route exact path="/courses/:id/update" component={UpdateCourse} />
                        <Route exact path="/courses/:id/delete" component={DeleteCourse} />
                        <Route exact path="/courses/:id" component={CourseDetail} />
                        <Route exact path="/signin" component={UserSignIn} />
                        <Route exact path="/signup" component={UserSignUp} />
                        <Route exact path="/signout" component={UserSignOut} />

                        <Route exact path="/notfound" component={NotFound} />
                        <Route exact path="/forbidden" component={Forbidden} />
                        <Route exact path="/error" component={UnhandledError} />
                        <Route component={NotFound}/>
                    </Switch>
            </Router>
        </div>
    );
}

export default App;
