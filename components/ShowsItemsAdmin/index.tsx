'use client'


import React, {useEffect, createContext, useState, useContext, useMemo } from 'react'
import CurrentlyTracking from './CurrentlyTracking'
import TrackNew from './TrackNew'
import useFetch from '@app/hooks/fetch'
import { useUserData } from '@context/userData'
import Loader from '@components/Loader'
import UnshippedGoods, { UnshippedGoods as UnshippedType } from '@components/UnshippedGoods'
import CallOut from '@components/CallOut'

const SetOrders = createContext({})































const index = () => {

  const {loggedInUser}:any = useUserData()
  const {data,loading} = useFetch(`/api/items/get/all/${loggedInUser?._id}`)
  const {data:unshipped,loading:unshippedLoading} = useFetch(`/api/items/get/allUnshipped/${loggedInUser?._id}`)

  const [orders,setOrders] = useState<[] | null>()
  const [unshippedGoods,setUnshippedGoods] = useState<UnshippedType[] | undefined>()
  const [showUnshipped,setShowUnshipped] = useState<boolean>(true)

    useEffect(()=>{
        setOrders(data)
        setUnshippedGoods(unshipped)

    },[data,unshipped])

      const unShippedLength:number = useMemo(()=>(
          unshippedGoods? unshippedGoods?.length: 0
      ),[unshippedGoods])

      const shippedLength:number = useMemo(()=>(
          orders? orders?.length: 0
      ),[orders])




  return (
    <SetOrders.Provider value={setOrders}>
   {
    loading?<Loader/>:
   
    showUnshipped ? 
    (
      unshippedLoading?<Loader/>:
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

    <CallOut numberofShipped={shippedLength} numberofUnshipped={unShippedLength} unshippedSeen={showUnshipped} setter={setShowUnshipped}/>


    </SetOrders.Provider>
  )
}

export default index


export const useSetOrders = ()=>(
  useContext(SetOrders)
)