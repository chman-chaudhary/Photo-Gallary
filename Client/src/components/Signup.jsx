import axios from 'axios';
import React, { useState } from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleInput = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { ...data };
        try {
            let response = await axios.post("http://localhost:3000/signup", formData); //send data to signup
            if (response.data.success) {
                return navigate("/"); // if successfully login the navigate to home page
            } else
                console.log("Sign up unsuccessful!!")
        } catch (error) {
            console.log(error);
        }
        setData({
            email: "",
            password: "",
        }) // clear the form
    }

    return (
        <>
            <Navbar />
            <div className='text-white flex items-center justify-center mt-[130px]'>
                <div className='bg-slate-400 py-5 px-10 rounded-md'>
                    <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
                        <h2 className='text-3xl text-center mb-5 font-bold'>Sign up</h2>
                        <label htmlFor="email">Email<br />
                            <input className='text-black rounded-md h-7' type="text" name='email' value={data.email} onChange={handleInput} id='email' required />
                        </label><br />
                        <label htmlFor="password">Password<br />
                            <input className='text-black rounded-md h-7' type="password" name='password' value={data.password} onChange={handleInput} id='password' required />
                        </label><br />
                        <button type='submit' className='bg-blue-700 py-1 px-3 rounded-md font-bold'>Sign up</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
