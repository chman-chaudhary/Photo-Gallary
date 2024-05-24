import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { uploadPhoto } from '../features/photoSlice';
import Navbar from './Navbar';
import { useCookies } from "react-cookie";
import { useNavigate, useParams } from "react-router-dom";

function Photo() {
    const dispatch = useDispatch();
    const photos = useSelector(state => state.photos);
    const params = useParams();
    const [views, setViews] = useState(0);
    const [cookies, removeCookie] = useCookies([]);
    const navigate = useNavigate();

    const uploadToStore = (array) => {
        array.map((element) => {
            dispatch(uploadPhoto(element));
        })
    }

    useEffect(() => {
        if (!cookies.token || cookies.token === "")
            return navigate("/login")
        const fetchData = async () => {
            let viewsData = await axios.get(`http://localhost:3000/photo/${params.id}`);
            let { views } = viewsData.data;
            setViews(views);
            let response = await axios.get("http://localhost:3000/photo");
            uploadToStore(response.data);
        }
        fetchData();
    }, [])

    return (
        <>
            <Navbar />
            <div className='w-full h-screen flex justify-center items-center mt-[92px]'>
                {photos.map((photo) => {
                    if (photo._id === params.id) {
                        return <div className='text-white max-w-96 bg-[#cecccc] px-6 pt-4' key={params.id}>
                            <img src={photo.url} alt="photo" className='w-96 h-64 rounded-lg' />
                            <h1 className='text-5xl text-[#612940] font-bold text-center mt-10'>{photo.title}</h1>
                            <h3 className='text-2xl text-[#612940] mt-5 text-center mb-6'>{photo.description}</h3>
                            <h3 className='text-2xl text-[#612940] mt-5 text-center mb-6'>{views} Views</h3>
                        </div>
                    }
                })}
            </div>
        </>
    )
}

export default Photo
