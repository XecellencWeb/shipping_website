'use client'


import {useEffect} from 'react'
import ShowItems from '@components/ShowItems'
import LogIn from '@components/Authentication/LogIn'
import SignUp from '@components/Authentication/SignUp'
import InformationComponent from '@components/InformationsComponent'
import { authBox } from '@vanilla/box/authbox'
import { usePathname, useRouter ,useSearchParams} from 'next/navigation'
import {accepttoken, localSessionName, rejectedToken} from '@constants/tokens'
import axios from 'axios'
import {storeSession} from '@vanilla/session'




// app/posts/page.ts



const Home = () => {
const router = useRouter()

const pathname = usePathname()
const params = useSearchParams()

    const verifyUser = async()=>{
      try {
          const {data:verifiedUser} = await axios(`/api/auth/verifyUser/${params.get('userid')}`)
          storeSession(verifiedUser,localSessionName)
          router.replace('/')
      } catch (err:any) {
          console.error(err.response)
      }
    }




  useEffect(() => {
     if(params.get('rejected') && params.get('rejectedtoken') === rejectedToken){
      authBox(401,`So sorry you can't enter that page.`)
      router.replace('/')
    }
     if(params.get('login') && params.get('rejectedtoken') === rejectedToken){
      authBox(401,`you must login to perform operations on site.`)
      router.replace('/?login=true')
    }


    if(params.get('verifyuser') && params.get('accesstoken') === accepttoken){
        verifyUser()
    }
    
  }, [params,pathname])
  
  return (<>
      {
        params.get('login') ?<LogIn/>:
        params.get('signup') && <SignUp/>
      }
      <InformationComponent/>
      <ShowItems/>
    </>
  )
}

export default Home
