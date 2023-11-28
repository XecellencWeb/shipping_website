'use client'

import FormElements, { formElements } from '@components/Authentication/FormElements'
import {useState} from 'react'




const fragileOption = [
  'Yes', 'No'
]



const ManipulateitemsBought = ({setter}:{
    setter:any
}) => {

    const [itemName,setItemName] = useState<string>('')
    const [itemQuantity,setItemQuantity] = useState<string>('')
    const [itemPrice,setItemPrice] = useState<string>('')
    const [weightPerItem,setWeightPerItem] = useState<string>('')


    const boughtItemsOtherProperties:formElements[] = [
        {
            name:'ItemQuantity',
            type:'input',
            value:'text',
            state:setItemQuantity,
            Value:itemQuantity,
          },
        {
            name:'ItemPrice',
            type:'input',
            value:'number',
            state:setItemPrice,
            Value:itemPrice,
          },
        {
            name:'WeightPerItem',
            type:'input',
            value:'number',
            state:setWeightPerItem,
            Value:weightPerItem,
          },
    ]




    const addItem = ()=>{
        //@ts-ignore
        setter(prev => [...prev,{
            itemName,
            itemQuantity:parseFloat(itemQuantity),
            itemPrice:parseFloat(itemPrice),
            weightPerItem:parseFloat(weightPerItem)

        }])
    }










    
  return (
    <div className='flex flex-col gap-3 mt-8'>
        <h1 className="text-center text-lg font-bold">Edit Items Bought</h1>
        <div className="flex max-sm:flex-col gap-2 w-full">
      <FormElements Value={itemName} name={'item name'} type={'input'} value='text' state={setItemName}/>
        <select name="" id="" className="sm:w-[25%] w-[10rem] rounded-[1rem] pl-4 py-4">
          <option value="" className="">Fragile</option>
          {
            fragileOption?.map(
              (opt,indx)=>(
                <option key={indx} value={opt} className="">{opt}</option>
              )
            )
          }
        </select>
      </div>
      <div className="flex gap-2 max-sm:flex-col">
            {
                boughtItemsOtherProperties?.map(
                    (filler,index)=>(
                        <FormElements key={index} Value={filler.Value} name={filler.name} type={filler.type} value={filler.value} state={filler.state}/>
                    )
                )
            }
      </div>
      <button onClick={addItem} className="h_white shadow-lg mt-2">Add To Items Bought</button>
    </div>
  )
}

export default ManipulateitemsBought
