import React, { useState } from 'react'
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom"
import Navbar from './Navbar';

function Login() {

  const navigate = useNavigate();
  const [error, setError] = useState();
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
      let response = await axios.post("http://localhost:3000/login", formData, { withCredentials: true });
      if (response.data.success) {
        console.log("Login Successfully!");
        navigate("/");
      } else
        setError("Incorrect email or password");
    } catch (error) {
      console.log(error);
    }
    setData({
      email: "",
      password: "",
    })
  }
  return (
    <>
      <Navbar />
      <div className='text-white flex items-center justify-center mt-[130px]'>
        <div className='bg-slate-400 py-5 px-10 rounded-md'>
          <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center'>
            <h2 className='text-3xl text-center mb-5 font-bold'>Login</h2>
            <h5 className='text-lg text-red-600 my-2 text-center'>{error}</h5>
            <label htmlFor="email">Email<br />
              <input className='text-black rounded-md h-7' type="text" name='email' id='email' value={data.email} onChange={handleInput} required />
            </label><br />
            <label htmlFor="password">Password<br />
              <input className='text-black rounded-md h-7' type="password" name='password' id='password' value={data.password} onChange={handleInput} required />
            </label><br />
            <button type='submit' className='bg-blue-700 py-1 px-3 rounded-md font-bold'>Login</button>
          </form>
          <p className='mt-3'>No account? <Link to="/signup" className='text-blue-700 font-semibold'> create one!</Link></p>
        </div>
      </div>
    </>
  )
}

export default Login
