'use client'


import React from 'react'
import ShowItemsAdmin from '@components/ShowsItemsAdmin'
import { useUserData } from '@context/userData'
import { useRouter } from 'next/navigation'
import { authBox } from '@vanilla/box/authbox'
import LogoutBtn from '@components/Authentication/LogoutBtn'
import { rejectedToken } from '@constants/tokens'





const Profile = () => {
    const navigator = useRouter()
    //@ts-ignore
    const {loggedInUser,isBoss} = useUserData()



    const NotAllowed = ()=>{
      navigator.replace(`/?rejected=true&rejectedtoken=${rejectedToken}`)
    }

  return (
    loggedInUser && isBoss ?

    <>
    <ShowItemsAdmin/>


      <LogoutBtn/>

    </>
    :(
        
        NotAllowed()
    )
  )
}

export default Profile
