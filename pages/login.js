import Link from 'next/link'
import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'

const Login = () => {
    const router = useRouter()
    const [values, setValues] = useState({
        email: "",
        password: ""
    })


    const handleOnChange = async (e) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    }


    const handleLogin = async (e) => {
        e.preventDefault()
        const response = await fetch(`${baseUrl}/api/login`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(values)
        })
        const res = await response.json()
        if (res.error) {
            toast.error(res.error)
        }
        else {
            toast.success(res.message)
            cookie.set('token', res.token)
            cookie.set('name', res.name)
            cookie.set('role', res.role)
            cookie.set('email', res.email)

            router.push('/account')
        }
    }

    return (

        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={(e) => handleLogin(e)} className="bg-white px-6 py-6 rounded shadow-lg text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Login</h1>
                    <input
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none lowercase"
                        name="email"
                        placeholder="Email" onChange={handleOnChange} value={values.email} />

                    <input
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none"
                        name="password"
                        placeholder="Password" onChange={handleOnChange} value={values.password} />

                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-purple-600 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Login</button>

                    <div className="text-gray-400 mt-3 text-center">
                        Don't have an account?
                        <Link href="/login">
                            <a className="no-underline border-b-2 border-blue-600 text-sm text-blue">
                                Login
                            </a></Link>
                    </div>

                </form>


            </div>
        </div>
    )
}

export default Login