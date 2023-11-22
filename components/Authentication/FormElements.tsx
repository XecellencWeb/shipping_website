'use client'


import {useState} from 'react'
import Image from 'next/image'
import { formatObjectKey } from '@vanilla/string_methods/sting'
import Loader from '@components/Loader'

export type formElements = {
    name:String,
    type:String,
    value:string,
    state: any,
    Value?:any,
    
}

export type btnProvider = {
    name:string,
    image:any,
    signInFunction:(name:string)=>void
}


export const ButtonProvider = ({name,image,signInFunction}:btnProvider)=>{
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const ContinueWithProvider = ()=>{

        setIsLoading(true)
        signInFunction(name.toLocaleLowerCase())
    }


    return (isLoading?(
       <Loader/> 
    ):<button type='button' onClick={ContinueWithProvider} className="g_primary flex gap-2 items-center w-full h-16  justify-center"><Image src={image} alt='Provider Image' width={20}/> Sign In with {name}</button>)
}







const FormElements = ({name,type,value,state,Value,}:formElements) => {
return (
    type == 'input'?(
        <div className="flex relative">
            <p className="w-20 text-base absolute top-1/2 -translate-y-1/2 opacity-60 ml-8">{formatObjectKey(name)}:</p>
        <input value={Value} onChange={(e)=>state(e.target.value)} className='p-4 pl-32 w-full rounded-[1rem]' type={value}  />
        </div>




    ):type === 'textarea' && (
        <textarea value={Value} onChange={(e)=>state(e.target.value)} className='p-4 w-full h-20  rounded-[1rem]' placeholder={`Enter your ${name}...`}/>
    )
)
}

export default FormElements
