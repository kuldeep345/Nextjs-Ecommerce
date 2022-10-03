import baseUrl from "../../helpers/baseUrl"
import {AiFillDelete} from 'react-icons/ai'
import React from 'react';
import Modal from 'react-modal';
import router from 'next/router' 
import {parseCookies} from 'nookies'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };



const Product = ({ product }) => {

      const {role} = parseCookies()

    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function afterOpenModal() {
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false);
    }

    const deleteProduct = async (req,res)=>{
        console.log("fuck")
        const res1 = await fetch(`${baseUrl}/api/product/${product._id}`,{
            method:"DELETE"
        })
        await res1.json()
        await closeModal()
        await router.push("/")
    }


    return (
        <>


<div>
 
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
   
      >
        <h2 className="font-semi-bold text-xl py-3" ref={(_subtitle) => (subtitle = _subtitle)}>Are you sure you want to delete this Product</h2>
        <div className="w-[350px] lg:w-[400px] flex justify-around mt-3">
        <button className="text-white bg-purple-700 border-0 py-1.5 px-3 focus:outline-none text-lg rounded" onClick={closeModal}>close</button>
        <button className="text-white bg-red-600 border-0 py-1.5 px-3 focus:outline-none  rounded text-lg" onClick={deleteProduct}>Yes</button>
        </div>
        
       
      </Modal>
    </div>


        <section className=" text-gray-600 body-font overflow-hidden">
            <div className=" container px-5 py-12 mx-auto ">
                <div className=" relative lg:w-4/5 mx-auto flex flex-wrap bg-white px-6 py-8 lg:py-4 lg:pr-40 rounded-md shadow-xl">
           {role != 'user' && <AiFillDelete className="absolute top-4 right-6 text-3xl text-red-600 cursor-pointer hover:scale-110" onClick={openModal}/>}
                    <div alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded flex justify-center items-center" >
                        <img src={product?.mediaUrl} className="mb-3" style={{ height: "inherit" }} />
                    </div>
                    <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product?.name}</h1>

                        <p className="leading-relaxed mt-3">{product?.description}</p>
                        <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">


                        </div>
                        <div className="flex">
                            <span className="title-font font-medium text-2xl text-gray-900">${product?.price}</span>
                            <button className="flex ml-auto text-white bg-purple-700 border-0 py-1.5 px-3 focus:outline-none hover:bg-purple-800 rounded">AddtoCart</button>

                        </div>
                    </div>
                </div>
            </div>
        </section>

</>
    )
}

export async function getServerSideProps({ params: { pid } }) {
    const res = await fetch(`${baseUrl}/api/product/${pid}`,{
      method:"GET"
    })
    const data = await res.json()
    
    return {
        props: { product: data }
    }
}

export default Product