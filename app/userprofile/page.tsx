'use client'

import React from 'react'
import { useUserData } from '@context/userData'
import { useRouter } from 'next/navigation'
import { authBox } from '@vanilla/box/authbox'
import ManageItemProfile from '@components/ManageItemProfile'
import LogoutBtn from '@components/Authentication/LogoutBtn'
import { rejectedToken } from '@constants/tokens'








const page = () => {
  const navigator = useRouter()
  //@ts-ignore
  const {loggedInUser,isBoss} = useUserData()



  const NotAllowed = ()=>{
    navigator.replace(`/?rejected=true&rejectedtoken=${rejectedToken}`)
    
  }

return (
  loggedInUser && !isBoss?
  <>
  <ManageItemProfile/>




  <LogoutBtn/>
  </>
  :(
      
      NotAllowed()
  )
)
}

export default page
