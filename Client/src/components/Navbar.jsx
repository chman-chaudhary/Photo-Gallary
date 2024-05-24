import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios"

export default function Navbar() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [btnText, setBtnText] = useState("Login");

    useEffect(() => { // change button text 
        if (cookies.token && cookies.token !== "") {
            setBtnText("Logout");
        } else {
            setBtnText("Login");
        }
    }, [])

    const handleClick = async () => {
        if (cookies.token === "" || !cookies.token) {
            navigate("/login");
            setBtnText("Login");
        } else {
            let response = await axios.get("http://localhost:3000/logout", { withCredentials: true });
            if (response.data.success) {
                setBtnText("Login");
            }
            window.location.reload();
        }
    }

    return (
        <div>
            <nav className="bg-[rgba(0,0,0,0.1)] w-screen z-50 m-0 fixed top-0 h-[68px] backdrop-blur-md">
                <div className="flex justify-between items-center py-2 px-3">
                    <Link to="/" ><div className="text-white">Logo</div></Link>
                    <div>
                        <ul className="list-none">
                            <li className="inline-block align-middle mr-4">
                                <Link
                                    className="px-6 py-3 min-w-28 min-h-9 align-middle rounded-full bg-transparent border-transparent shadow-none overflow-hidden inline-block relative font-bold text-center cursor-pointer no-underline navbar-links"
                                    to="/"
                                >
                                    <span className="text-[14px] text-white font-bold text-center cursor-pointer align-middle">
                                        Home
                                    </span>
                                </Link>
                            </li>
                            <li className="inline-block align-middle mr-4">
                                <Link
                                    className="px-6 py-3 min-w-28 min-h-9 align-middle rounded-full bg-transparent border-transparent shadow-none overflow-hidden inline-block relative font-bold text-center cursor-pointer no-underline navbar-links"
                                    to="/upload"
                                >
                                    <span className="text-[14px] text-white font-bold text-center cursor-pointer align-middle">
                                        Add new photo
                                    </span>
                                </Link>
                            </li>
                            <li className="inline-block align-middle mr-4">
                                <div className="block">
                                    <ul className="flex flex-row-reverse mx-[7px]">
                                        <li className="flex flex-row-reverse -mx-[7px]">
                                            <Link
                                                onClick={handleClick}
                                                className="rounded-full min-w-28 min-h-9 px-6 py-3 bg-[#F6F6F6] text-[#303030] overflow-hidden inline-block relative learn-btn-shadow text-center"
                                            >
                                                <span className="text-[14px] align-middle font-bold bg-[#F6F6F6]">
                                                    {btnText}
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}
