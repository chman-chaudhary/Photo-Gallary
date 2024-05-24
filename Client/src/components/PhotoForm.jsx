import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { uploadPhoto } from "../features/photoSlice.js"
import Navbar from './Navbar.jsx';
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function PhotoForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies, removeCookie] = useCookies([]);

    const [data, setData] = useState({
        title: "",
        description: "",
        img: null,
    })

    useEffect(() => {
        if (!cookies.token || cookies.token === "")
            return navigate("/login")
    }, [])

    const handleInput = (e) => {
        if (e.target.name === "img")
            setData({ ...data, img: e.target.files[0] });
        else
            setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = { ...data };
        try {
            const response = await axios.post("http://localhost:3000/photo/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }, withCredentials: true,
            })
            if (response.data.success) {
                dispatch(uploadPhoto(response.data.photo));
                return navigate("/");
            } else
                console.log("Error");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar />
            <div className='text-white flex flex-col items-center mt-6'>
                <h2 className='text-white text-5xl font-bold mt-10'>Upload Photo</h2>
                <form className='flex flex-col mt-8 text-lg' onSubmit={handleSubmit}>
                    <label htmlFor="title">Title<br />
                        <input type="text" className='text-black rounded-md h-8 w-80' name="title" id="title" value={data.title} onChange={handleInput} required />
                    </label><br />
                    <label htmlFor="description">Description<br />
                        <textarea name="description" id="description" rows={4} value={data.description} onChange={handleInput} className='text-black rounded-md w-80'></textarea>
                    </label><br />
                    <label htmlFor="img">Image<br />
                        <input type='file' className='text-white rounded-md h-9 border-2 border-white w-80' name="img" id="img" required onChange={handleInput} accept="image/*" />
                    </label><br />
                    <button type='submit' className='bg-blue-700 py-1 px-3 rounded-md font-bold'>Upload Photo</button>
                </form>
            </div >
        </>
    )
}

export default PhotoForm
