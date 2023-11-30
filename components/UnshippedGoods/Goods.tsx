'use client'


import { hourlyDate } from '@vanilla/dataFormater'
import {useState} from 'react'
import { UnshippedGoods } from '.'
import Receipt from '@components/Receipt'
import { useUserData } from '@context/userData'
import { authBox } from '@vanilla/box/authbox'
import { useSetOrders } from '@components/ShowsItemsAdmin'
import Loader from '@components/Loader'




const Goods = ({goods}:{
goods:UnshippedGoods
}) => {

    const [showReceipt,setShowReceipt] = useState<boolean>(false)
    const {axiosSender,loggedInUser}:any = useUserData()
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const defineOrders:any = useSetOrders()


    const ShipUnshipped = async()=>{



            const newLocation = prompt('Enter new Location.')
        try {
  
          setIsLoading(true)
         const {data} = await axiosSender.patch(`/api/items/updatelocation/${loggedInUser._id}`,{
            itemId:goods._id,
            newLocation,
            shipped:true
          })
  
  
          defineOrders(data)
        } catch (error:any) {
  
          authBox(error.status,error.response.message)
          console.error(error.response)
        }finally{
          setIsLoading(false)
        }
      }


  return  isLoading?
        
        (
            <Loader/>
        )
        :(
            
            <>
        <div onClick={()=>setShowReceipt(prev => !prev)} className="mt-20 cursor-pointer relative px-12 flex flex-col gap-5 py-2 isolate hover:scale-90">
            <div className="bg-white bg-opacity-60 dark:bg-opacity-20 absolute blur-[2px] top-0 left-0 right-0 bottom-0 -z-10"/>
            <div className="flex max-sm:flex-col max-sm:items-center gap-2 justify-between items-center pt-2">
            <h1 className="text-4xl font-black">{goods.itemsBought.map(item => item.itemName[0].toUpperCase()+item.itemName.slice(1)).join(', ')}</h1>
            <button onClick={ShipUnshipped} className="bg-pink-500 px-4 py-2 rounded-lg font-bold cursor-pointer hover:scale-90">Ship Item</button>
            </div>
            <p className="text-center font_grandi">{goods.description}</p>
            <div className="flex max-sm:flex-col max-sm:items-center justify-between">
                <p className="text-base capitalize">client No:{goods.clientNumber}</p>
                <p className="text-base">{hourlyDate(goods.lastUpdated)}</p>
            </div>
        </div>



        {
            showReceipt && <Receipt data={goods}/>
        }


    </>)
  
}

export default Goods