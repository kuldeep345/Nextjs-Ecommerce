import Link from 'next/link'
import React from 'react'
import { parseCookies } from 'nookies'
import {BsFillCartCheckFill} from 'react-icons/bs'
import cookie from 'js-cookie'
import {useRouter} from 'next/router'
import {toast} from 'react-toastify'

const Navbar = () => {
    const router = useRouter()
    const { token , role} = parseCookies()
    let user = false

    if (token) {
        user = true
    }
    else {
        user = false
    }

    return (
        <header className="sticky top-0 text-gray-600 body-font bg-purple-700 z-50">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Link href="/"><span className="ml-3 font-bold text-2xl text-white cursor-pointer">Ecommerce</span></Link>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    {
                        user ? (
                            <>
                           {(role=='root' || role=='admin') && <Link href="/create"><a className="mx-5 hover:text-purple-100 text-white cursor-pointer font-semibold">Create</a></Link>}
                         
                          <Link href="/account"><a className="mx-5 hover:text-purple-100 text-white cursor-pointer font-semibold">Account</a></Link>
                          
                               <Link href="#"><button className="ml-4 inline-flex  hover:bg-red-600  py-1 px-3 focus:outline-none rounded text-base font-semibold bg-red-500 text-white border border-white hover:scale-110" onClick={()=>{
                                cookie.remove('token')
                                cookie.remove('name')
                                cookie.remove('role')
                                cookie.remove('email')
                                router.push('/')
                                toast.success('logout successful')
                               }}>Logout</button></Link>                            
                            </>
                        ): (
                                <>
                            <Link href = "/signup"><button className = "ml-4 inline-flex   hover:text-purple-700 hover:bg-gray-100  py-1 px-3 focus:outline-none rounded text-base font-semibold bg-purple-700 text-white border hover:border-none border-white hover:scale-110">SignUp</button></Link>

                            <Link href="/login"><button className="ml-4 inline-flex hover:text-purple-700 hover:bg-gray-100  py-1 px-3 focus:outline-none rounded text-base font-semibold bg-purple-700 text-white border hover:border-none border-white hover:scale-110">Login</button></Link>
                                    </>
                )
            }
                <Link href="/cart">
                    <BsFillCartCheckFill color='white' fontSize='20px' className="ml-8"/>
                </Link>

                </nav >
            </div >
        </header >
    )
}

export default Navbar