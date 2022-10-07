import React from 'react'
import { parseCookies } from 'nookies'
import baseUrl from '../helpers/baseUrl'

const Account = ({ order }) => {

  const { token, name, email, role } = parseCookies()

  const initialValue = 0;

  const totalQuantity = order?.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    initialValue
    );


  const totalprice= order?.reduce(
    (previousValue, currentValue) => previousValue + currentValue.product.price,
    initialValue
    );


      const total = totalQuantity * totalprice

      if(order == null || undefined ){
        return (
          <h2>You Have no order history</h2>

        )
      }

  return (
    <div className='container'>
      <div className='text-center'>
        <h4>{name}</h4>
        <h4>{email}</h4>
      </div>


      <div className=" ">
        <div className=" inset-0 overflow-hidden">
          <div className="right-0 ">

            <div className="pointer-events-auto w-[100%]">
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Your Orders</h2>

                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul role="list" className="-my-3 divide-y divide-gray-200">
                        {order.map(item => (

                          <li key={item._id} className="flex py-3">
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

      <h3 className='text-bold text-2xl px-4 py-4'>Total: ${total}</h3>

    </div>
  )

}

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx)
  if (!token && token == undefined) {
    const { res } = ctx
    res.writeHead(302, { Location: "/login" })
    res.end()
  }

  const res = await fetch(`${baseUrl}/api/order`, {
    headers: {
      "token": token
    }
  })

  const response = res == (undefined || null)? null : await res.json()
  console.log(response)

  if(response===null){
    return {
      props: {
        order: null
      }
    }
  }

  else{
    return {
      props: {
        order: response.products
      }
    }
  }

}

export default Account