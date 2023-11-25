import React, {useEffect, useState} from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { message } from "antd"
import { loggedUser, loginUser } from "../../slices/userReducer"
import { api, requestConfig } from "../../utils/config";




function Signin() {

    const userInfo = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        if(userInfo.loggedIn)
            navigate("/dashboard");
    }, [userInfo])

    const user_login = async (email, password) => {
        setLoading(true);
        const response = await fetch(api+"/signin", requestConfig("POST", {
            email: email,
            password: password
        }));
        if(response.ok) {
            setLoading(false);
            const data = await response.json();
            if(!data.status)
                message.error(data.data);
            else dispatch(loggedUser())
        } else {
            message.error("Authentication is failed.")
            setLoading(false);
        }
    }

    return (
        <div className="h-[100vh] bg-[#1f2a40]">
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img className="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company"/>
                <h2 className="mt-10 text-center text-white text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={(e) => {
                    e.preventDefault();
                    user_login(email, password);
                    // dispatch(loggedUser());
                }}>
                <div>
                    <label for="email" className="block text-sm text-white font-medium leading-6 text-gray-900">Email address</label>
                    <div className="mt-2">
                    <input id="email" name="email" type="email" required className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => {
                        setEmail(e.target.value)
                    }}/>
                    </div>
                </div>

                <div>
                    <div className="flex items-center justify-between">
                    <label for="password" className="block text-white text-sm font-medium leading-6 text-gray-900">Password</label>
                    </div>
                    <div className="mt-2">
                    <input id="password" name="password" type="password" required className="p-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e) => {
                        setPassword(e.target.value);
                    }}/>
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={loading} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign in</button>
                </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                Not a member?
                {/* <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create account</a> */}
                <Link to="/sign-up" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Create account</Link>
                </p>
            </div>
            </div>
            </div>
    )
}

export default Signin;

