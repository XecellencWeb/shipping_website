import useFetch from '@app/hooks/fetch';
import CurrentlyTracking from '@components/ShowsItemsAdmin/CurrentlyTracking';
import { useUserData } from '@context/userData';
import Loader from '@components/Loader'
import React from 'react'
import UnshippedGoods from '@components/UnshippedGoods';




const index = () => {
  const {loggedInUser}:any = useUserData()
  const {data:orders,loading} = useFetch(`/api/items/get/owner/${loggedInUser?._id}`)
  const {data:unshipped,loading:unshippedLoading} = useFetch(`/api/items/get/owner/${loggedInUser?._id}/unshipped`)
  


  return (<>
    <div className='my-20 wrapper'>
        <h1 className="text-lg font-bold text-center ">All Tracked Goods Record</h1>
      {loading?
      (<Loader/>)
      :<CurrentlyTracking userView = {true} orders={orders}/>}
    </div>
    
    <div className='my-20 wrapper'>
        <h1 className="text-lg font-bold text-center ">Goods pending shipping.</h1>
      {unshippedLoading?
      (<Loader/>)
      :<UnshippedGoods data={unshipped}/>}
    </div>
    </>
  )
}

export default index
