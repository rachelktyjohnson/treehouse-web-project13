import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from "axios";
import Loading from './loading';

export default function CourseDetail(){

    let {id} = useParams();
    let history = useHistory();
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [materialsArray, setMaterialsArray] = useState([]);

    function handleDelete(e){
        setIsLoading(true);
        e.preventDefault();
        axios.delete(`http://localhost:5000/api/courses/${id}`)
            .then( () => setIsLoading(false))
            .catch(error => {
                console.log('Error fetching and parsing data', error);
                if (error.response.status===401){
                    history.push('/forbidden');
                } else {
                    history.push('/error');
                }
            })
            .then((response) => {
                setIsLoading(false);
                history.push('/');
            })
            .catch(error => {
                setIsLoading(false);
                console.log('Error fetching and parsing data', error);
                if (error.response.status===401){
                    history.push('/forbidden');
                }
            })
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/courses/${id}`)
            .then(response => {
                setData(response.data);
                let materials = response.data.materialsNeeded.split('*');
                materials.shift();
                setMaterialsArray(materials);
            })
            .catch(error => console.log('Error fetching and parsing data', error))
            .finally(()=>setIsLoading(false));
    }, [id])

    if (isLoading){
        return (
            <Loading/>
        )
    } else {
        return (
            <main>
                <div className="actions--bar">
                    <div className="wrap">
                        <Link className="button" to={'/courses/'+data.id+'/update'}>Update Course</Link>
                        <Link className="button" onClick={handleDelete}>Delete Course</Link>
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

                                <p>{data.description}</p>
                            </div>
                            <div>
                                <h3 className="course--detail--title">Estimated Time</h3>
                                <p>{data.estimatedTime || "No estimated time"}</p>

                                <h3 className="course--detail--title">Materials Needed</h3>
                                <ul className="course--detail--list">
                                    {materialsArray.map((material, index)=>(
                                        <li key={index}>{material}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        )
    }
}
