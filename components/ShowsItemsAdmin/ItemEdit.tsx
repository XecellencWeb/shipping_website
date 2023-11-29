'use client'


import FormElements, { formElements } from '@components/Authentication/FormElements'
import { ReceiptInfo } from '@components/Receipt'
import BoughtItems, { itemsBought } from '@components/Receipt/ItemsBought'
import {useState} from 'react'
import ManipulateitemsBought from './ManipulateitemsBought'
import {authBox} from '@vanilla/box/authbox'
import { useUserData } from '@context/userData'
import Loader from '@components/Loader'
import { useSetOrders } from '.'


type EditData = Partial<ReceiptInfo> & {
    method:string,
    opener?:any,
    cancelBtn?:any,
}

const ItemEdit = ({data,method,opener,cancelBtn}:EditData) => {

  //@ts-ignore
const {axiosSender,loggedInUser} = useUserData()


const defineOrders:any = useSetOrders()


const [isLoading, setIsLoading] = useState<boolean>(false)

const [distance,setDistance] = useState<string>(data?.distance || '')
const [description,setDescription] = useState(data?.description)
const [address,setaddress] = useState(data?.address)
const [clientNumber,setclientNumber] = useState(data?.clientNumber)
const [currentLocation,setcurrentLocation] = useState(data?.currentLocation)
const [deliveryMethod,setdeliveryMethod] = useState(data?.deliveryMethod)
const [itemsBought,setitemsBought] = useState<itemsBought[]>(data?.itemsBought || [])




    const values:formElements[] = [
        {
            name:'description',
            type:'input',
            value:'text',
            state:setDescription,
            Value:description,
            allSeen:true
          },
        {
          name:'address',
          type:'input',
          value:'text',
          state:setaddress,
          Value:address,
          allSeen:true
        },
        {
          name:'clientNumber',
          type:'input',
          value:'text',
          state:setclientNumber,
          Value:clientNumber
        },
        {
          name:'currentLocation',
          type:'input',
          value:'text',
          state:setcurrentLocation,
          Value:currentLocation,
          allSeen:false
          
        },
        {
          name:'deliveryMethod',
          type:'input',
          value:'text',
          state:setdeliveryMethod,
          allSeen:true,
          Value:deliveryMethod
        },
        
      ]



    

    const distanceSetter = [
      
      {
        name:'distance',
        type:'input',
        value:'domestic',
        state:setDistance,
        allSeen:true
      },
      {
        name:'distance',
        type:'input',
        value:'international',
        state:setDistance,
        allSeen:true
      },
    ]








      










      const updateTrackingData = async()=>{

        if(method === 'create'){

          try {
            setIsLoading(true)
            const {data:result} = await axiosSender.post(`/api/items/create/${loggedInUser._id}`,{
              name,description,address,clientNumber,deliveryMethod,currentLocation,itemsBought
            })

            cancelBtn(false)
            authBox(200,'Item created Sucessfully')

            defineOrders(result)

            
          } catch (err:any) {
            console.error(err.response)
          }finally{
            setIsLoading(false)
          }




            
            return
        }





        try {
          setIsLoading(true)
          const {data:result}:any = await axiosSender.patch(`/api/items/edit/${data?._id}/${loggedInUser._id}`,{
            name,description,address,clientNumber,deliveryMethod,currentLocation,itemsBought
          })

          opener(false)
          authBox(200,'Item Updated Sucessfully')
          defineOrders(result)

        } catch (err:any) {
          console.error(err.response)
        }finally{
          setIsLoading(false)
        }

      }





  return (
    <div className='my-20 flex flex-col small_wrapper justify-center'>


      {method.toLowerCase() === 'calculate' && (
        <h1 className="font_ultra text-[3rem] mb-8">Calculate Shipping</h1>
      )}
      <h1 className="text-2xl font-bold mb-1">Distance</h1>
      <div className="flex gap-5 w-full mb-12 ">
      {
        distanceSetter?.map(
          (distance,key)=>(
            <div key={key} className="flex gap-2 w-full">
              <input value={distance.value} onChange={(e)=>distance.state(e.target.value)} type="radio" name={distance.name} className="" />
              <p className="">{distance.value}</p>
              </div>
            )
            )
          }
      </div>


      <div className="small_wrapper flex flex-col gap-4">

      {method.toLowerCase() !== 'calculate'?values?.map(
        (values,index)=>
      <FormElements Value={values.Value} key={index} name={values.name} type={values.type} value='text' state={values.state}/>
    ):
    
    values?.filter(item=> item.allSeen)?.map(
      (values,index)=>
    <FormElements Value={values.Value} key={index} name={values.name} type={values.type} value='text' state={values.state}/>
  )
    
    
    }

            <div className="w-full my-20">
                    <h1 className="text-center text lg font-bold mb-8">Items Bought</h1>
            <BoughtItems setter = {setitemsBought} data={itemsBought}/>
            <ManipulateitemsBought calculatingFor={distance} calculating={method?.toLowerCase() === 'calculate'} setter={setitemsBought}/>
            </div>

          {isLoading ?
          
          <Loader/>
          
          :  <div className="flex gap-5 ">
                <button onClick={updateTrackingData} className="w-full sm:w-[30%] bg-blue-600 sm:text-base rounded-[1rem] h-10 hover:bg-blue-900 text-white">{method}</button>
            { method === 'create' &&   <button onClick={()=>cancelBtn(false)} className="h_white w-full sm:w-[30%] shadow-lg">Cancel</button>}
            </div>}
      </div>
    </div>
  )
}

export default ItemEdit
