'use client'
import {useState,useMemo} from 'react'
import Receipt, { ReceiptInfo } from '@components/Receipt'
import LocationUpdate from './LocationUpdate'
import ItemEdit from './ItemEdit'
import { formatObjectKey } from '@vanilla/string_methods/sting'
import { statuskeys } from '@components/ShowItems'
import {hourlyDate} from '@vanilla/dataFormater'
import CopyId from '@components/CopyId'


export type DataRepresentor = ReceiptInfo & {
    userView?:boolean,
}

const HeadData = ({data,userView}:DataRepresentor) => {

    const [fullView, setFullView] = useState(false)
    const [updateChoice, setUpdateChoice] = useState(false)
    const [editChoice, setEditChoice] = useState(false)

    const dataRearranged = useMemo(()=>(
        
            {
              id:data?._id,
              name: data?.itemsBought.map(item=> item.itemName).join(','),
              quantity:data?.quantity,
              itemsWeight:data?.totalWeight+'kg',
              currentLocation:data?.currentLocation,
              status:data?.status,
              lastUpdated: hourlyDate(data?.lastUpdated)
           }
          
        
      ),[data])




      const detailsView = ()=>{

        setEditChoice(false)
        setFullView(prev => !prev)
        setUpdateChoice(false)
        

      }
      const UpdateLocation = ()=>{

        setEditChoice(false)
        setFullView(false)
        setUpdateChoice(prev => !prev)
        

      }

      const EditItem = ()=>{
        setEditChoice(prev => !prev)
        setFullView(false)
        setUpdateChoice(false)
        
      }


  return (
    <>
    <div className="flex relative">
        
              {Object.entries(dataRearranged)?.map(
                ([key,value],index)=>(
                    <div key={index} className={"w-[16.66%] border-2 border-b-none border-solid border-[rgba(204,204,204,.3)] text-center cursor-pointer"}>
                        <h1 className="text-lg py-2 font-bold border-b-2 h-20 bg-blue-500 opacity-90 border-solid border-blue-800">{formatObjectKey(key)}</h1>
                        <p className="text-base mt-4 h-40 pb-8 w-full opacity-50  px-2 break-words inline-block gap-2 justify-center items-center">{formatObjectKey(value?.toString())}
                        {
                          key === 'status' && (
                            <span className={`w-4 h-4 ml-2  inline-block rounded-full ${statuskeys[value]}`}/>
                          )
                        }
                        </p>
                    </div>
                )
            )}
            <div className="absolute bottom-0 left-0 flex flex-col gap-1 items-start m-2 ml-4 scale-90 origin-bottom-left">
            <button onClick={detailsView} className=" italic text-blue-500 text-base hover:underline">{!fullView?"View Details":"Less Details"}</button>
            {!userView && (<>
            <button onClick={UpdateLocation} className=" italic text-blue-500 text-base hover:underline">{!updateChoice?"Update Location":"Cancel"}</button>
            <button onClick={EditItem} className=" italic text-blue-500 text-base hover:underline">{!editChoice?"Edit Item":"Cancel"}</button>
            </>
            )}</div>


            <div className="absolute bottom-0 right-0 mb-8">
              <CopyId id={dataRearranged.id}/>
            </div>


            </div>

            {
            fullView && (
                <Receipt data={data}/>
            )
        }
        
            {
            updateChoice && !userView && (
                <LocationUpdate id={data._id}/>
            )
            }
            {
            editChoice && !userView && (
                <ItemEdit  opener = {setEditChoice} data={data} method='Edit'/>
            )
            }
    </>
  )
}

export default HeadData
