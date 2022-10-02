import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <header className="sticky top-0 text-gray-600 body-font bg-purple-700 z-50">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <Link href="/"><span className="ml-3 font-bold text-2xl text-white cursor-pointer">Ecommerce</span></Link>
                </a>
                <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                    <button className="ml-4 inline-flex hover:text-purple-700 hover:bg-gray-100  py-1 px-3 focus:outline-none rounded text-base font-semibold bg-purple-700 text-white border hover:border-none border-white hover:scale-110">SignUp</button>

                    <button className="ml-4 inline-flex hover:text-purple-700 hover:bg-gray-100  py-1 px-3 focus:outline-none rounded text-base font-semibold bg-purple-700 text-white border hover:border-none border-white hover:scale-110">Login</button>

                    <a className="mx-5 hover:text-purple-100 text-white cursor-pointer font-semibold">Create</a>
                </nav>
            </div>
        </header>
    )
}

export default Navbar