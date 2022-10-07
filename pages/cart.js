import baseUrl from '../helpers/baseUrl'
import { parseCookies } from 'nookies'
import { toast } from 'react-toastify'
import cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { AiFillDelete } from 'react-icons/ai'
import Link from 'next/link'
import { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';

const Cart = ({ error, products }) => {



    const router = useRouter()
    const { token } = parseCookies()
    if (!token && error) {
        return (
            <div className="w-full text-center pt-6">
                <h3 className='text-2xl font-semibold'>Please Login to view your cart</h3>
                <Link href="/login">
                    <a>
                        <button type="button" className="inline-block mt-3 px-4 py-2 bg-purple-600 text-white font-medium text-lg leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out">Login</button>
                    </a>
                </Link>
            </div>
        )
    }


    if (error) {
        toast.error(error)
        cookie.remove('token')
        cookie.remove('name')
        cookie.remove('email')
        cookie.remove('role')
        router.push('/login')
    }







    const CartItems = () => {

        const [cartProducts, setCartProducts] = useState(products)
        console.log(cartProducts.length)

        const totalqty = cartProducts.reduce((prev, curr) => prev + curr.quantity, 0
        )

        const totalprice = cartProducts.reduce((prev, curr) => prev + curr.product.price, 0
        )


        const handleRemove = async (pid) => {
            const res2 = await fetch(`${baseUrl}/api/cart`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    productId: pid
                })
            })
            const response = await res2.json()

            setCartProducts(response)
        }

        const handleCheckout = async (paymentInfo) => {
            console.log(paymentInfo)
            const res = await fetch(`${baseUrl}/api/payment`, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json',
                    'token': token
                },
                body: JSON.stringify({
                    paymentInfo
                })
            })

            const res2 = await res.json()
            console.log(res2)
        }

        if (cartProducts.length === 0 ) {
            return (
                <div className='flex flex-col items-center justify-center gap-2'>
                    <h2>No Items in the cart</h2>
            
                    <button type="button" onClick={() => router.push('/')} className="font-medium text-white bg-purple-600 px-3 py-1 border-none rounded-md shadow-md">
                        Continue Shopping
                    </button>
   
                </div>

            )
        }

        return (
            <>
                {cartProducts.length >=1 && <div className=" z-10 h-screen bg-white flex flex-col lg:flex-row gap-4" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">


                    <div className=" ">
                        <div className=" inset-0 overflow-hidden">
                            <div className="right-0 ">

                                <div className="pointer-events-auto w-[100%]">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>

                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                        {cartProducts.map(item => (

                                                            <li key={item._id} className="flex py-6">
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img src={item.product.mediaUrl} alt="" className="h-full w-full object-contain object-center" />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a href="#">{item.product.name}</a>
                                                                            </h3>
                                                                            <p className="ml-4">${item.product.price}</p>
                                                                        </div>

                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-500">quantity: {item.quantity}</p>

                                                                        <div className="flex">
                                                                            <button onClick={() => handleRemove(item.product._id)} type="button" className="font-medium text-indigo-600 hover:text-indigo-500">Remove</button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))
                                                        }



                                                    </ul>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Subtotal</p>
                            <p>${totalprice * totalqty}</p>

                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">The total amount depends on the quantity and price of the product you selected.</p>
                        <div className="mt-6">
                            <StripeCheckout
                                name="My Store"
                                amount={totalprice * totalqty * 100}
                                image={products[0]?.product.mediaUrl}
                                currency="INR"
                                shippingAddress={true}
                                billingAddress={true}
                                zipCode={true}
                                stripeKey="pk_test_51LpXtpSElKHW7RKuEmMbUDMEac5UVQVbrGIY9dROnwbqMBavVkBX57mpE7hvVSB9UTVNkYyJRRipgTyGkbg2v2Mf00KETHIcXX"
                                token={(paymentInfo) => handleCheckout(paymentInfo)}
                            >
                                <a href="#" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">Checkout</a>
                            </StripeCheckout>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                                or
                                <button type="button" onClick={() => router.push('/')} className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Continue Shopping
                                    <span aria-hidden="true"> &rarr;</span>
                                </button>
                            </p>
                        </div>
                    </div>


                </div>}
                

            </>
        )
    }

    return (
        <div className="container flex justify-center items-center min-h-screen">
            <CartItems />
        </div>
    )
}

export async function getServerSideProps(ctx) {

    const { token } = parseCookies(ctx)

    if (!token) {
        return {
            props: { products: [] }
        }
    }
    const res = await fetch(`${baseUrl}/api/cart`, {
        method: "GET",
        headers: {
            "token": token
        }
    })
    const products = await res.json()

    if (products.error) {
        return {
            props: { error: products.error }
        }
    }


    return {
        props: { products }
    }
}


export default Cart