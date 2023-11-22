import {useMemo} from 'react'
import HeadData from './HeadData';
import BodyData from './BodyData';
import { ReceiptInfo, orderType } from '@components/Receipt';





type currentlyTracking = {
  orders:orderType[] | undefined,
  userView?:boolean
}





const CurrentlyTracking = ({orders,userView}:currentlyTracking) => {

  



  return (
    <div className='my-20 mt-8 wrapper overflow-x-auto'>
      <div className="flex flex-col max-sm:scale-90 rounded-lg overflow-clip max-sm:w-[40rem] origin-top-left">
        {

          orders?.map(
            (order,index)=>(
              index === 0 ? 
              <HeadData  userView={userView} data={order}/>
            :
            (


              <BodyData userView = {userView} data={order}/>
            ))


            

        
          )
        }
      </div>
    </div>
  )
}

export default CurrentlyTracking
