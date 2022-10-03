import React , {useState,useEffect} from 'react'
import {HiPaperAirplane} from 'react-icons/hi'
import baseUrl from '../helpers/baseUrl'
import {  toast } from 'react-toastify';
import {parseCookies} from 'nookies'


const create = () => {
    const [media, setMedia] = useState(null)

    const [values , setValues] = useState({
        name:"",
        price:"",
        description:""
    })

    useEffect(() => {
      setValues({
        name:"",
        price:"",
        description:""
      })

      setMedia(null)
    }, [])
    

    const handleOnChange = (e)=>{
        setValues({
            ...values,
            [e.target.name]:e.target.value
        })
    }

    const handleSubmit = async(e)=>{
      e.preventDefault()
      const mediaUrl = await imageUpload()
       const res = await fetch(`${baseUrl}/api/products`,{
        method:"POST",
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          name:values.name,
          price:values.price,
          mediaUrl,
          description:values.description
        })
       })
       const res2 = await res.json()
       if(res2.error){
        toast.error(res2.error);
       }
       else{
        toast.success(res2.message);
        setValues({
          name:"",
          price:"",
          description:""
      })
       }
    }


    const imageUpload = async(req,res)=>{
      const data = new FormData()
      data.append('file' , media)
      data.append('upload_preset', 'Ecommerce')
      data.append('cloud_name','cdf')
      const res1 = await fetch('https://api.cloudinary.com/v1_1/cdf/image/upload',{
        method:'POST',
        body:data
      })

      const res2 = await res1.json()
      return res2.url
    }

  return (
    <div>

<section className="text-gray-600 body-font relative">
    <h3 className='text-center pt-4 text-3xl font-semibold text-purple-800'>Add Your Product</h3>
  <div className="container px-5 py-6 mx-auto flex sm:flex-nowrap flex-wrap">
    <form onSubmit={handleSubmit} className=" md:w-1/2 mx-auto rounded-lg p-[20px] bg-white flex flex-col  w-full ">
      <div className="relative mb-4">
        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        onChange={handleOnChange} value={values.name}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="price" className="leading-7 text-sm text-gray-600">price</label>
        <input type="price" id="price" name="price" className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        onChange={handleOnChange} value={values.price}
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="file" className="leading-7 text-sm text-gray-600">Image</label>
        <input type="file" id="file" name="file" className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        onChange={(e)=>setMedia(e.target.files[0])} vlaue={media}
        />
        <img src={media?URL.createObjectURL(media):""} />
      </div>
      <div className="relative mb-4">
        <label htmlFor="description" className="leading-7 text-sm text-gray-600">Description</label>
        <textarea id="description" name="description" className="w-full bg-white rounded border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" onChange={handleOnChange} value={values.description}></textarea>
      </div>
      <button type="submit" className="text-white flex justify-center items-center bg-purple-700 border-0 py-1.5 px-6 focus:outline-none hover:bg-purple-600 rounded">
        <div className='flex items-center justify-center gap-2 '>
        <span className='text-lg'>Submit</span> 
        <HiPaperAirplane className='rotate-[90deg]'/>
        </div>
        </button>
    </form>
  </div>
</section>

    </div>
  )
}

export async function getServerSideProps(ctx){
  const {name ,role , email} = await parseCookies(ctx)
  console.log(name ,role , email)
  if(role!='admin'){
    const {res} = ctx
    res.writeHead(302,{Location:"/login"})
    res.end()
  }

  return {
    props:{}
  }
}



export default create