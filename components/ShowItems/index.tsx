'use client'

import React, { useMemo, useState, useRef } from 'react'
import Receipt from '@components/Receipt'
import { formatObjectKey } from '@vanilla/string_methods/sting'
import { useUserData} from '@context/userData'
import { useRouter} from 'next/navigation'
import {  rejectedToken } from '@constants/tokens'
import Link from 'next/link'
import Loader from '@components/Loader'
import { hourlyDate } from '@vanilla/dataFormater'



export const statuskeys:any= {
  comming:'bg-orange-500',
  arrived:'bg-green-500',
  commingSoon: 'bg-green-300',
  neverCame:'bg-red-500'
}


const index = () => {
    const {loggedInUser, axiosSender}:any = useUserData()
    const navigator = useRouter()
    const goodsidref:any = useRef()

    const [isLoading , setIsLoading] = useState(false)

    const [orderData,setOrderData] = useState<any>()

    const trackedGood:object = useMemo(()=>({
            id:orderData?._id,
            //@ts-ignore
            name: orderData?.itemsBought.map(item=> item.itemName).join(','),
            itemsQuantity:orderData?.quantity,
            itemsWeight:orderData?.totalWeight+'kg',
            currentLocation:orderData?.currentLocation,
            status:orderData?.status,
            lastUpdated:hourlyDate(orderData?.lastUpdated)
    }),[orderData])

    const [fullView,setFullView] = useState(false)



    const findGoods = async()=>{
      if(!loggedInUser){
          navigator.push(`/?login=true&rejectedtoken=${rejectedToken}`)
          return
      }
        
      try {
          setIsLoading(true)
        const {data} = await axiosSender.patch(`/api/items/get/${loggedInUser._id}`,{id:goodsidref.current.value,email:loggedInUser.email})

        setOrderData(data)
        
      } catch (error:any) {
        alert(error.response.data)
        console.error(error.response)
      }finally{
        setIsLoading(false)
      }
    }






  return (
    <div className='my-20'>
      <div className="flex w-full sm:w-[70%] gap-5">
        <input ref={goodsidref}  placeholder='Enter Goods Id' type="text" name="" id="" className="p-4 w-full rounded-sm"/>
        <button onClick={findGoods} className="w-[30%] bg-blue-700 text-white hover:bg-blue-950 rounded-lg">Find Goods</button>
      </div>

      <div className="my-20">
        <div className="flex max-lg:flex-col overflow-hidden rounded-lg  mx-auto">


            {isLoading?
                <Loader/>
              :orderData &&  Object.entries(trackedGood)?.map(
                    ([key,value],index)=>(
                        <div key={index} className={"w-full border-2 border-b-none border-solid border-[rgba(204,204,204,.3)] text-center"}>
                            <h1 className="text-lg py-2 font-bold border-b-2 bg-blue-500 opacity-90 border-solid border-blue-800">{formatObjectKey(key)}</h1>
                            <p className="text-base mt-8 pb-8 opacity-50 flex gap-2 items-center justify-center">{formatObjectKey(value?.toString())}
                            
                            {
                              key == 'status' && (
                                <span className={`w-4 h-4 inline-block ${statuskeys[value]} rounded-full`}></span>
                              )
                            }
                            
                            </p>
                            
                        </div>
                    )
                )
            }
        </div>
       {orderData && <button onClick={()=>setFullView(prev => !prev)} className="mt-4 italic text-blue-700 text-[1.7rem] hover:underline">{!fullView?"View Details":"Less Details"}</button>}
            {orderData && <Link className='bg-orange-500 rounded-full px-12 py-4 my-20 mx-auto hover:bg-orange-700 block text-center text-white small_wrapper' href='/userprofile'>Manage Goods</Link>}
        {
            fullView && (
                <Receipt data={orderData}/>
            )
        }

      </div>
    </div>
  )
}

export default index
