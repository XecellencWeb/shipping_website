'use client'


import React, {useEffect, createContext, useState, useContext } from 'react'
import CurrentlyTracking from './CurrentlyTracking'
import TrackNew from './TrackNew'
import useFetch from '@app/hooks/fetch'
import { useUserData } from '@context/userData'
import Loader from '@components/Loader'

const SetOrders = createContext({})

const index = () => {

  const {loggedInUser}:any = useUserData()
  const {data,loading} = useFetch(`/api/items/get/all/${loggedInUser?._id}`)

  const [orders,setOrders] = useState()

    useEffect(()=>{
        setOrders(data)
    },[data])






  return (
    <SetOrders.Provider value={setOrders}>
   {
    loading?<Loader/>:
   
   orders && <div className='wrapper my-20'>
      <CurrentlyTracking  orders = {orders}/>
    </div>}
    <div className="wrapper">
      <TrackNew />
    </div>
    </SetOrders.Provider>
  )
}

export default index


export const useSetOrders = ()=>(
  useContext(SetOrders)
)