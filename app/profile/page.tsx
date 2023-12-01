'use client'


import React, { useEffect } from 'react'
import ShowItemsAdmin from '@components/ShowsItemsAdmin'
import { useUserData } from '@context/userData'
import { useRouter } from 'next/navigation'
import Header from '@components/Header'
import LogoutBtn from '@components/Authentication/LogoutBtn'
import { rejectedToken } from '@constants/tokens'
import { websiteName } from '@constants/text'





const Profile = () => {
    const navigator = useRouter()
    //@ts-ignore
    const {loggedInUser,isBoss} = useUserData()



    const NotAllowed = ()=>{
      navigator.replace(`/?rejected=true&rejectedtoken=${rejectedToken}`
      )
    }


if(loggedInUser === null || isBoss === false){
  
  return NotAllowed()
}

  return (
    

    <>
    <Header displayText={`Control and recieve Great produce from ${websiteName}`}/>
    <ShowItemsAdmin/>


      <LogoutBtn/>

    </>
    
  )
}

export default Profile
