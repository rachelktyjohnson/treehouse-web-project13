import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import ReactMarkdown from "react-markdown";

import Loading from './loading';

export default function CourseDetail({context}){

    let {id} = useParams();
    let history = useHistory();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUser, setIsUser] = useState(false);

    function handleDelete(e){
        setIsLoading(true);
        e.preventDefault();const token = Buffer.from(`${context.authenticatedUser.emailAddress}:${context.password}`, 'utf8').toString('base64')

        axios.delete(`http://localhost:5000/api/courses/${id}`,{
            headers: {
                'Authorization': `Basic ${token}`
            }})
            .then( () => {
                setIsLoading(false)
                history.push('/');
            } )
            .catch(error => {
                console.log('Error fetching and parsing data', error);
                if (error.response.status===401){
                    history.push('/forbidden');
                } else if (error.response.status===500){
                    history.push('/error');
                }
            })

    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                if (response.data == null){
                    history.push('/notfound');
                }
                setData(response.data);
                if (context.authenticatedUser !== null){
                    setIsUser(response.data.userId === context.authenticatedUser.id)
                }

            })
            .catch(error => {
                console.log('Error fetching and parsing data', error)
                if (error.response.status===401){
                    history.push('/forbidden');
                } else if (error.response.status===500){
                    history.push('/error');
                }
            })
            .finally(()=>setIsLoading(false));
    }, [id, history])

    if (isLoading){
        return (
            <Loading/>
        )
    } else {
        return (
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        {isUser ? (
                            <>
                                <Link className="button" to={"/courses/"+data.id+"/update"}>Update Course</Link>
                                <button className="button" onClick={handleDelete}>Delete Course</button>
                            </>
                            ) : ""}
                        <Link className="button button-secondary" to="/">Return to List</Link>
                    </div>
                </div>

                <div className="wrap">
                    <h2>Course Detail</h2>
                    <form>
                        <div className="main--flex">
                            <div>
                                <h3 className="course--detail--title">Course</h3>
                                <h4 className="course--name">{data.title}</h4>
                                <p>By {data.teacher.firstName} {data.teacher.lastName}</p>

                                <ReactMarkdown>{data.description}</ReactMarkdown>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{data.estimatedTime || "No estimated time"}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    <ReactMarkdown>{data.materialsNeeded}</ReactMarkdown>
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}

