'use client'


import React from 'react'
import {signOut} from 'next-auth/react'
import { deleteSession } from '@vanilla/session'
import { localSessionName } from '@constants/tokens'

const LogoutBtn = () => {

  const logout = ()=>{

    if(!confirm('Are you sure you want to logout?')){
      return
    }

    signOut()
    deleteSession(localSessionName)
  }


  return (
<button onClick={logout}  className="flex mx-auto my-40 justify-center bg-pink-400 opacity-80 hover:opacity-100 px-20 py-2 rounded-full gap-2 items-center">
     <p className="text-white text-base">Log Out</p>
  </button>
  )
}

export default LogoutBtn
