import React from 'react';
import { Link } from 'react-router-dom';

export default class Courses extends React.Component {
    render() {
        return(
            <main>
                <div className="wrap main--grid">
                    {/* TODO: Dynamically generate */}
                    <Link className="course--module course--link" to="/courses/1">
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">Build a Basic Bookcase</h3>
                    </Link>
                    <a className="course--module course--add--module" href="create-course.html">
                        <span className="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                 viewBox="0 0 13 13" className="add"><polygon
                                points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                            New Course
                        </span>
                    </a>
                </div>
            </main>
        )
    }
}
