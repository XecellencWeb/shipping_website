'use client'


import Link from 'next/link'
import React, { useMemo } from 'react'
import Header from  '@components/Header'
import { useUserData } from '@context/userData'
import Image from 'next/image'
import logo from '@assets/logo.png'
import { websiteName } from '@constants/text'





type NavbarProps = {
        name:String,
        path:string,
        visibility:Boolean,
        className:string,
        ico?:string
}

const index = () => {
    //@ts-ignore
    const {loggedInUser:loggedIn,isBoss} = useUserData()


    const paths:NavbarProps[] = useMemo(()=>(
        [
            {
             
                name:'Log In',
                path:'/?login=true',
                visibility:!loggedIn,
                className:"h_black sm:w-40 text-center text_1 h-12 flex justify-center items-center"
                
            },
            {
             
                name:'Sign Up',
                path:'/?signup=true',
                visibility:!loggedIn,
                className:"h_white sm:w-40 text-center text_1 h-12 flex justify-center items-center"
                
            },
            {
             
                name:'Profile',
                path:'/profile',
                ico:"bi bi-person-circle",
                visibility:loggedIn && isBoss,
                className:"flex gap-2 items-center hover:text-red-500 text-base"
                
            },
            {
             
                name:'Your Profile',
                path:'/userprofile',
                ico:"bi bi-person-circle",
                visibility:loggedIn && !isBoss,
                className:"flex gap-2 items-center hover:text-red-500 text-base"
                
            },
        ]
    ),[loggedIn,isBoss])




const renderedPaths:NavbarProps[] = useMemo (()=>(paths?.filter((property)=>(property.visibility))),[paths])







  return (
    <>
    <div className='absolute z-10 h-20 flex items-center top-0 left-0 w-screen'>
        <ul className='relative head_wrapper justify-end flex gap-3 sm:gap-10  text-white'>
            <Link href='/' className="absolute top-0 left-0 flex items-center gap-1">
                <Image src={logo} width={50} height={50} alt='Logo Image'/>
                <p className="hover:scale-110 text-base max-sm:hidden font_ops">{websiteName}</p>
            </Link>
      {
         renderedPaths?.map(
            (route,index)=>(
                <li key={index} className={route.className + ' text-white'}>{route.ico && (
                  <i className={route.ico + ' text-[2rem]'}/>
                )}<Link href={route.path}>{route.name}</Link></li>
            )
         )
      }
      

      </ul>

    </div>
      <Header/>
    </>
  )
}

export default index
