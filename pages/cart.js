import baseUrl from '../helpers/baseUrl'
import {parseCookies} from 'nookies'
import { toast } from 'react-toastify'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'

const Cart = ({error})=>{

    const router = useRouter()

    if(error){
        toast.error(error)
        cookie.remove('token')
        cookie.remove('name')
        cookie.remove('email')
        cookie.remove('role')
        router.push('/login')
    }
    return (
        <h1>Cart Page</h1>
    )
}

export async function getServerSideProps(ctx){
    
    const {token} = parseCookies(ctx)
    if(!token){
        return {
            props:{products:[]}
        }
    }
    const res = await fetch(`${baseUrl}/api/cart`,{
        headers:{
            "token":token+'1234'
        }
    })
    const products = await res.json()
    if(products.error){
        return {
            props:{error:products.error}
        }
    }
    console.log("products",products)
    
    return {
        props:{products}
    }
}


export default Cart