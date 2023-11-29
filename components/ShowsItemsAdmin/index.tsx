'use client'


import React, {useEffect, createContext, useState, useContext } from 'react'
import CurrentlyTracking from './CurrentlyTracking'
import TrackNew from './TrackNew'
import useFetch from '@app/hooks/fetch'
import { useUserData } from '@context/userData'
import Loader from '@components/Loader'
import UnshippedGoods from '@components/UnshippedGoods'

const SetOrders = createContext({})






              const unshippedGoods = [
                {
                  _id: '1',
                  distance: 'domestic',
                  shipped:false,
                  description: 'Unshipped to Tongo',
                  quantity: 5,
                  currentLocation: 'abuja',
                  status:'comming',
                  lastUpdated: new Date(),
                  // Additional properties
                  address: 'Tongo',
                  clientNumber: '123456789',
                  totalWeight: 34, // Represented in kg
                  deliveryMethod: 'train',
                  itemsBought:[ 
                    {
                    itemName: 'nacklace',
                    itemQuantity: 4,
                    itemPrice: 30,
                    weightPerItem: 0.5,
                    fragile:'No'
                    },
                    {
                    itemName: 'Hard drive',
                    itemQuantity: 4,
                    itemPrice: 30,
                    weightPerItem: 0.5,
                    fragile:'No'
                    },

              ]},

                {
                  _id: '1',
                  distance: 'domestic',
                  shipped:false,
                  description: 'Unshipped to Tongo',
                  quantity: 5,
                  currentLocation: 'abuja',
                  status:'comming',
                  lastUpdated: new Date(),
                  // Additional properties
                  address: 'Tongo',
                  clientNumber: '123456789',
                  totalWeight: 34, // Represented in kg
                  deliveryMethod: 'train',
                  itemsBought:[ 
                    {
                    itemName: 'nacklace',
                    itemQuantity: 4,
                    itemPrice: 30,
                    weightPerItem: 0.5,
                    fragile:'No'
                    },
                    {
                    itemName: 'Hard drive',
                    itemQuantity: 4,
                    itemPrice: 30,
                    weightPerItem: 0.5,
                    fragile:'No'
                    },

              ]},
              ]

























const index = () => {

  const {loggedInUser}:any = useUserData()
  const {data,loading} = useFetch(`/api/items/get/all/${loggedInUser?._id}`)

  const [orders,setOrders] = useState()
  const [showUnshipped,setShowUnshipped] = useState<boolean>(true)

    useEffect(()=>{
        setOrders(data)
    },[data])






  return (
    <SetOrders.Provider value={setOrders}>
   {
    false?<Loader/>:
   
    showUnshipped ? 
    (
      <UnshippedGoods data={unshippedGoods}/>
    )
:


   orders && <><div className='wrapper my-20'>
      <CurrentlyTracking  orders = {orders}/>
    </div>
    <div className="wrapper">
      <TrackNew />
    </div>
    </>
}
    </SetOrders.Provider>
  )
}

export default index


export const useSetOrders = ()=>(
  useContext(SetOrders)
)