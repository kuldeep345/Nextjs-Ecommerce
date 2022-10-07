import { useState, useEffect } from "react";
import { parseCookies } from "nookies";
import baseUrl from "../helpers/baseUrl";


function UserRoles() {

    const [users , setUsers] = useState([])
    
    const { token } = parseCookies()

    useEffect(() => {
        fetchUser()
    }, [])

    const fetchUser = async () => {
        const res = await fetch(`${baseUrl}/api/users`, {
            method:'GET',
            headers: {
                'token': token
            }
        })
        const res2 = await res.json()
        console.log(res2)
        setUsers(res2)
    }


    const handleRole = async(_id,role)=>{
        const res = await fetch(`${baseUrl}/api/users`,{
            method:"PUT",
            headers:{
                'Content-type':'application/json',
                'token':token
            },
            body:JSON.stringify({
                _id,
                role
            })
        })

        const res2 = await res.json()
        console.log(res2)

        const updatedUsers = users.map(user=>{
            if((user.role != res2.role) && (user.email === res2.email) ){
                return res2
            }
            else{
                return user
            }
        })

        setUsers(updatedUsers)
    }

    return (
        <>
            <h2 className="mt-10 text-3xl text-center font-bold tracking-[0.5rem] text-gray-500 font-sans">UserRoles</h2>
            <div className="w-[100%] mx-auto bg-white mt-6 rounded-lg shadow-lg">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className="border-b">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Name
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Email
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                            Role
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users?.map(item=>(
                                         <tr key={item._id} className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.name}
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.email}
                                        </td>
                                        <td onClick={()=>handleRole(item._id,item.role)} className="cursor-pointer text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            {item.role}
                                        </td>
                                    </tr> ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default UserRoles