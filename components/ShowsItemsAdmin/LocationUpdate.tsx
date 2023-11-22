'use client'
import FormElements from '@components/Authentication/FormElements'
import { statuskeys } from '@components/ShowItems'
import { useUserData } from '@context/userData'
import { authBox } from '@vanilla/box/authbox'
import { formatObjectKey } from '@vanilla/string_methods/sting'
import Loader from '@components/Loader'

import {useState} from 'react'
import { useSetOrders } from '.'

const LocationUpdate = ({id}:{
  id:string,
}) => {


  const defineOrders:any = useSetOrders()

  const [isLoading,setIsLoading] = useState<boolean>(false)

const {axiosSender,loggedInUser}:any = useUserData()

    const [newLocation, setnewLocation] = useState()
    const [status,setStatus] = useState<any>()

    const changeLocation = async()=>{
      try {

        setIsLoading(true)
       const {data} = await axiosSender.patch(`/api/items/updatelocation/${loggedInUser._id}`,{
          itemId:id,
          newLocation,
          status
        })


        defineOrders(data)
      } catch (error:any) {

        authBox(error.status,error.response.message)
        console.error(error.response)
      }finally{
        setIsLoading(false)
      }
    }


  return (
    <div className='my-20 flex justify-center'>
      <div className="small_wrapper flex flex-col gap-2">
        <h1 className="text-center">Update Location</h1>
      <FormElements name={'New Location'} type={'input'} value='text' state={setnewLocation}/>
      <h1 className="ml-8 mt-4 opacity-70">Upate Status</h1>
      <div className="flex gap-3">
          <select value={status} onChange={(e)=>setStatus(e.target.value)} className="w-full rounded-full h-12 text-center">
            {
              Object.keys(statuskeys)?.map(
                (key,index)=>(
                  <option key={index} value={key} className="">{formatObjectKey(key)}</option>
                )
              )
            }
          </select>
         {isLoading ?
         
         <Loader/>
         : <button onClick={changeLocation} className="w-[30%] bg-blue-600 px-8 py-4 text-white rounded-[2rem] ">Change Location</button>}
      </div>
      </div>
    </div>
  )
}

export default LocationUpdate
