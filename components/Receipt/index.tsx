'use client'


import {useMemo} from 'react'
import {formatObjectKey} from '@vanilla/string_methods/sting'
import ItemsBought from './ItemsBought'
import { hourlyDate } from '@vanilla/dataFormater'


export type orderType = {
    _id: string;
    distance: string;
    description?: string;
    quantity: number;
    currentLocation: string;
    status:string,
    lastUpdated: Date;
    // Additional properties
    address: string;
    clientNumber: string;
    totalWeight: number; // Represented in kg
    deliveryMethod: string;
    itemsBought: {
      itemName: string;
      itemQuantity: number;
      itemPrice: number;
      weightPerItem: number;
      fragile:string
}[]
}
export type ReceiptInfo = {
   data:orderType
  }

const index = ({data}:ReceiptInfo) => {

    const GoodsData = useMemo(()=>({
        id: data?._id,
        distance:data?.distance,
        customerAddress: data?.address,
        location: data?.currentLocation,
        clientNumber: data?.clientNumber,
        deliveryMethod: data?.deliveryMethod,
        totalWeight: data?.totalWeight.toString() + 'kg',
        quantity: data?.quantity.toString(),
        lastUdated: hourlyDate(data?.lastUpdated),
        description: data?.description
    }),[data])


  return (
    <div className='small_wrapper py-8'>
      
        <div className="w-[70%] mx-auto mb-12">
            {
                Object.entries(GoodsData)?.map(
                    
                    ([key,value],index)=>(
                        <div key={index} className="flex w-full ">
                            <h1 className="w-full text-lg font-bold">{formatObjectKey(key)}:</h1>
                            <p className="w-full text-base opacity-70">{value}</p>
                        </div>
                    )
                )
            }


        </div>


                
            <ItemsBought data={data?.itemsBought}/>


      </div>

  )
}

export default index
