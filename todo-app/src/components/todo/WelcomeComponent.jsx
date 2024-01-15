import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import {retriveHelloWordPath} from './api/HelloWorldApiService';
import { useAuth } from '../security/AuthContext';

export default function WelcomeComponent() {
    const [message, setMessage] = useState(null);
    const authContext = useAuth();
    const username = authContext.username;

    function callHelloWorldAPI() {
        retriveHelloWordPath(username)
        .then((res) => {successResponse(res)})
        .catch((err) =>{errorResponse(err)})
        .finally(()=> {console.log("cleanup");});
    }

    function successResponse(res) {
        setMessage(res.data.message);
    }

    function errorResponse(err) {
        console.log("error",err);
    }

    return (
        <div className="Welcome">
            <h1>Welcome {username}</h1>
            <div>
                Your todos - <Link to='/todos'>Go here...</Link>
            </div>

            <div className="btn btn-success m-5" onClick={callHelloWorldAPI}>
                call Hello world
            </div>

            <div className='text-info m-5'>{message}</div>
        </div>
    );
}
