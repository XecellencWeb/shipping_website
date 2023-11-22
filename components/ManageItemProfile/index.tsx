import useFetch from '@app/hooks/fetch';
import CurrentlyTracking from '@components/ShowsItemsAdmin/CurrentlyTracking';
import { useUserData } from '@context/userData';
import Loader from '@components/Loader'
import React from 'react'




const index = () => {
  const {loggedInUser}:any = useUserData()
  const {data:orders,loading} = useFetch(`/api/items/get/owner/${loggedInUser?._id}`)


  return (
    <div className='my-20'>
        <h1 className="text-lg font-bold text-center ">All Tracked Goods Record</h1>
      {loading?
      (<Loader/>)
      :<CurrentlyTracking userView = {true} orders={orders}/>}
    </div>
  )
}

export default index
