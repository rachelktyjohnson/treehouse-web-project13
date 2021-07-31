import React, { useEffect, useState } from 'react';
import {Redirect, useParams, useHistory} from 'react-router-dom';
import axios from "axios";
import Loading from "./loading";

export default function DeleteCourse(){

    let {id} = useParams();
    let history = useHistory();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
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
    }, [id])

    if (isLoading){
        return (
            <Loading/>
        )
    } else {
        return (
            <Redirect to="/"/>
        )
    }
}
