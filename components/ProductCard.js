import React from 'react'
import Link from 'next/link'

const ProductCard = ({id ,name, mediaUrl, price ,description}) => {
  return (
    <>
    
   <Link href={`/product/${id}`}>
      <div className="mx-6 md:mx-0 py-4 md:w-3/4 lg:w-2/4 xl:w-1/4 bg-white shadow-purple-400 shadow-md rounded-lg cursor-pointer">
        <div className="h-full rounded-lg overflow-hidden">
          <img className="h-[18rem] lg:h-52 md:h-40 w-full object-contain object-cente pt-4" src={mediaUrl} alt="blog"/>
          <div className="p-1">
            <h2 className="tracking-normal text-lg title-font font-medium text-gray-900 mb-1">{name}</h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">${price}</h1>
            <p className="leading-relaxed mb-3 text-sm text-gray-400">{description.slice(0,150)}...</p>
            <div className="flex items-center flex-wrap ">
              <a className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0">View Product
                <svg className="w-4 h-4 ml-2" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
     </Link>
 
    
    </>
  )
}

export default ProductCard