'use client'

import React from 'react'
import { useUserData } from '@context/userData'
import { useRouter } from 'next/navigation'
import Header from '@components/Header'
import ManageItemProfile from '@components/ManageItemProfile'
import LogoutBtn from '@components/Authentication/LogoutBtn'
import { rejectedToken } from '@constants/tokens'
import { websiteName } from '@constants/text'








const page = () => {
  const navigator = useRouter()
  //@ts-ignore
  const {loggedInUser,isBoss} = useUserData()



  const NotAllowed = ()=>{
    navigator.replace(`/?rejected=true&rejectedtoken=${rejectedToken}`)
    
  }

if(loggedInUser  === null  || isBoss === true){

  return NotAllowed()
}



return (
  
  <>
  <Header displayText={`Manage and Explore the ${websiteName}`}/>
  <ManageItemProfile/>

  <LogoutBtn/>
  </>
  
)
}

export default page
