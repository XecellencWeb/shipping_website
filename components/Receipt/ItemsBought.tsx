'use client'

import {useState} from 'react'

export type itemsBought = {
    
        itemName: string;
        itemQuantity: number;
        itemPrice: number;
        weightPerItem: number; // Weight per item in kg
      
}



export type itemsBoughtProps = {
    data?:itemsBought[],
    setter?:any
}

const ItemsBought = ({data,setter}:itemsBoughtProps) => {

    const [activeIndexStyle,setActiveIndexStyle] = useState<number | null>(null)


    const deleteItem:(idx:number)=>void = (index)=>{



        //@ts-ignore
        setter(prev => prev.filter(
            //@ts-ignore
            (_,ind)=>(
                ind !== index
            )
        ))
    }





  return (
    <div className="flex w-full">
                <div className="flex flex-col w-[35%] ">
                    <div className="text-lg font-bold"> Item Name </div>
                    {
                        data?.map(
                            (item,index)=>(
                            <div onClick={()=>{setter && deleteItem(index)}} onMouseOver={()=>setActiveIndexStyle(index)} onMouseOut={()=>setActiveIndexStyle(null)} key={index} className={`h-12 ${activeIndexStyle === index ? 'opacity-30':'opacity-70'}`}>
                                    <p className="text-base">{item.itemName}</p>
                                    <p className="text-base">{item.weightPerItem}kg each</p>
                                </div>
                            )
                        )
                    }
                </div>
                <div className="flex flex-col w-[35%] ">
                    <div className="text-lg font-bold"> Item Quantity </div>
                    {
                        data?.map(
                            (item,index)=>(
                                <div onClick={()=>{setter && deleteItem(index)}} onMouseOver={()=>setActiveIndexStyle(index)} onMouseOut={()=>setActiveIndexStyle(null)} key={index} className={`h-12  ${activeIndexStyle === index ? 'opacity-30':'opacity-70'}`}>
                                    <p className="text-base">{item.itemQuantity}</p>
                                    
                                </div>
                            )
                        )
                    }
                </div>
                <div className="flex flex-col  w-[35%] items-end">
                    <div className="text-lg font-bold"> Item Price </div>
                    {
                        data?.map(
                            (item,index)=>(
                                <div onClick={()=>{setter && deleteItem(index)}} onMouseOver={()=>setActiveIndexStyle(index)} onMouseOut={()=>setActiveIndexStyle(null)} key={index} className={`h-12 ${activeIndexStyle === index ? 'opacity-30':'opacity-70'}`}>
                                    <p className="text-base">{item.itemPrice.toLocaleString('en-US', {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}</p>
                                    
                                </div>
                            )
                        )
                    }
                </div>

        </div>
        
  )
}

export default ItemsBought
