'use client'

import { createContext , useEffect, useMemo, useState, ReactNode, useContext} from 'react'
import {getSession} from 'next-auth/react'
import { getSessionData } from '@vanilla/session'
import { localSessionName } from '@constants/tokens'
import { usePathname, useSearchParams } from 'next/navigation'
import axios from 'axios';



const userData = createContext({})

export type ContextProps = {
    children:ReactNode
}




const UserData = ({children}:ContextProps) => {

const pathname = usePathname()
const params = useSearchParams()


const [loggedInUser,setloggedInUser] = useState<any>('')

  const sessionGetter = async()=>{
    const session =  await getSession()
    if(session?.user){
      setloggedInUser(session?.user)

      return
    }

    setloggedInUser(getSessionData(null,localSessionName))
  }

    useEffect(() => {
        sessionGetter()




    }, [])


    const isBoss:boolean = useMemo(() => (
      
          loggedInUser?.isBoss
    ),[loggedInUser])






    

// Create an instance of Axios
const axiosSender = axios.create();

// Add a request interceptor
axiosSender.interceptors.request.use(
  (config) => {
    // Modify the request config to include the token in the header
    const token = loggedInUser?.token; // replace with your actual token
    config.headers['Authorization'] = `${token}`;
    return config;
  },
  (error) => {
    // Handle errors
    return Promise.reject(error);
  }
);





  return (
    <userData.Provider value={{loggedInUser,isBoss,axiosSender}}>
        {children}
    </userData.Provider>
  )
}



export const useUserData = ()=>(
    useContext(userData)
)
export default UserData
