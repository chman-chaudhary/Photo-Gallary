import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { uploadPhoto } from "../features/photoSlice.js"
import { Link } from 'react-router-dom';
import axios from 'axios'
import Navbar from './Navbar.jsx';

function Home() {
    const photos = useSelector(state => state.photos)
    const dispatch = useDispatch();

    const uploadToStore = (array) => {
        array.map((element) => {
            dispatch(uploadPhoto(element));
        })
    }

    useEffect(() => {
        const fetchData = async () => {
            let response = await axios.get("http://localhost:3000/photo");
            uploadToStore(response.data);
        }
        fetchData();
    }, [])

    return (
        <>
            <Navbar />
            <div className='grid grid-cols-3 gap-4 mt-[80px]'>
                {photos.map((photo) => {
                    return <Link to={`/photo/${photo._id}`} key={photo._id}>
                        <div className='bg-[#cecccc] w-84 h-64 flex flex-col items-center rounded-lg justify-evenly'>
                            <img src={photo.url} alt="photo" className='h-44 w-72 rounded-lg' />
                            <p className='text-[#612940] text-2xl'>{photo.title}</p>
                        </div>
                    </Link>
                })}
            </div>
        </>
    )
}

export default Home
