import Link from 'next/link'
import React, { useState } from 'react'
import baseUrl from '../helpers/baseUrl'
import {useRouter} from 'next/router'
import {  toast } from 'react-toastify';

const Signup = () => {

    const router = useRouter()

    const [values , setValues] = useState({
        name:"",
        email:"",
        password:""
    })

   

    const handleOnChange = async(e)=>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }

    const handleSignup = async(e)=>{
        e.preventDefault()
        const response = await fetch(`${baseUrl}/api/signup`,{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(values)
        })

        const res2 = await response.json()
        if(res2.error){
         toast.error(res2.error);
        }
        else{
         toast.success(res2.message);
         router.push('/login')
        }

    }


  return (
    
<div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <form onSubmit={(e)=>handleSignup(e)} className="bg-white px-6 py-6 rounded shadow-lg text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none"
                        name="name"
                        placeholder="Full Name" onChange={handleOnChange} value={values.name}/>

                    <input 
                        type="text"
                        className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none lowercase"
                        name="email"
                        placeholder="Email" onChange={handleOnChange} value={values.email}/>

                    <input 
                        type="password"
                        className="block border border-grey-light w-full p-3 rounded mb-4 focus:outline-none"
                        name="password"
                        placeholder="Password" onChange={handleOnChange} value={values.password}/>
               
                    <button
                        type="submit"
                        className="w-full text-center py-3 rounded bg-purple-600 text-white hover:bg-green-dark focus:outline-none my-1"
                    >Create Account</button>

                    <div className="text-gray-400 mt-3 text-center">
                    Already have an account? 
                    <Link href="/login">
                        <a className="no-underline border-b-2 border-blue-600 text-sm text-blue">
                        Log in
                    </a></Link>
                </div>

                </form>

               
            </div>
        </div>
  )
}

export default Signup