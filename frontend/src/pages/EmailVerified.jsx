import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';
import { Link, useNavigate, useParams } from 'react-router-dom';
import successAnimation from '../assets/sent-mail.mp4';
import errorAnimation from '../assets/error-mail.mp4'

const EmailVerified = () => {
    const { id } = useParams();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate=useNavigate()

    const verify = async () => {
        try {
            const res = await axios.get(`${URL}/api/auth/verifymail/${id}`);
            console.log(res);
            setSuccess(true);

        } catch (err) {
            console.log(err);           
            setError(true);

        }finally{
            setIsLoading(false);
        }
    };

    useEffect(() => {
        verify();
    }, [id]);

    setTimeout(() => {
        setSuccess(false);
        setError(true);
        navigate('/login');
      }, 8000);


    return (
        <div className="flex justify-center items-center h-screen">
            {success ? (
                <div className="text-green-600 flex flex-col">
                <video src={successAnimation} loop autoPlay muted className="w-full h-96 mt-[-50px]"/>
                <div className="text-center mt-[-50px]">
                    <p className='mb-4 text-xl md:text-3xl'>Email verified successfully</p>
                    <Link to="/login" className="text-sm md:text-lg text-white p-1 md:p-2 rounded-lg bg-purple-700 hover:bg-purple-600">Go to login page</Link>
                </div>
            </div>
            
            ) : error ? (
                <div className="text-red-500 flex flex-col justify-center items-center">
                   <video src={errorAnimation} loop autoPlay muted className="w-64 h-80 mt-[-50px]"/>
                    <div className="text-center mt-[-40px]">
                    <p className='mb-4 text-xl md:text-3xl'>Error in verifying email. Again register with valid mail</p>
                    <Link to="/login" className="text-sm md:text-lg text-white p-1 md:p-2 rounded-lg bg-purple-700 hover:bg-purple-600">Go to login page</Link>
                </div>
                </div>
            ) : isLoading ?(
                <div className="text-gray-500 text-2xl font-bold">Verifying email...</div>
            ):null}
        </div>
       
    );
};

export default EmailVerified;
