'use client'


import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@assets/logo.png'
import { websiteName } from '@constants/text'
import FormElements from '@components/Authentication/FormElements'
import { scrollToId } from '@vanilla/animations/customscroll'
import SocialIcons from '@components/SocialIcons'



const siteLinks:{
  name:string,
  type?:string,
  path:string
}[] = [
  {
    name:'get started',
    path:'/calculateshipping'
  },
  {
    name:'track goods',
    type:'button',
    path:'tracking'
  },
  {
    name:'about us',
    type:'button',
    path:'about'
  },
  {
    name:'services',
    type:'button',
    path:'services'
  },
  
  {
    name:'testimonies',
    type:'button',
    path:'testimonies'
  },
  
  
]














const index = () => {
const [message,setMessage] = useState<string>('')




  return (
    <div className='flex flex-col text_white bg-black bg-opacity-75'>
      <div className="wrapper mt-20 mb-8 flex max-md:flex-col gap-5 justify-between text_white">
      <Link href='/' className=" flex items-center gap-1 w-full">
                <Image src={logo} width={50} height={50} alt='Logo Image'/>
                <p className="hover:scale-110 text-base  font_ops">{websiteName}</p>
      </Link>
      <div className="flex gap-2 w-full md:w-[50%]">
        <FormElements name='send us a message' Value={message} state={setMessage} type='textarea'/>
          <button className="self-end">Send</button>
      </div>
      </div>



      <div className="wrapper my-20">
        <div className="">
          {
            siteLinks?.map(
              (link,key)=>(
                link?.type?(
                  <button onClick={()=>scrollToId(link.path)} key={key} className="ml-4 capitalize hover:scale-110 hover:text-blue-800 hover:font-bold transition-[font-weight] ">{link.name}</button>
                ):(
                  <Link key={key} className='capitalize hover:scale-110 hover:text-blue-800 hover:font-bold transition-[font-weight]' href={link.path}>{link.name}</Link>
                )
              )
            )
          }
        </div>
        <SocialIcons/>
      </div>
        <p className="text-center text-base mb-8">The Best Shipping Providers</p>
    </div>
  )
}

export default index
