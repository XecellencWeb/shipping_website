'use client'


import {useEffect} from 'react'
import ShowItems from '@components/ShowItems'
import LogIn from '@components/Authentication/LogIn'
import SignUp from '@components/Authentication/SignUp'
import InformationComponent from '@components/InformationsComponent'
import { authBox } from '@vanilla/box/authbox'
import { usePathname, useRouter } from 'next/navigation'
import {accepttoken, localSessionName, rejectedToken} from '@constants/tokens'
import axios from 'axios'
import {storeSession} from '@vanilla/session'




// app/posts/page.ts
type PropsParams = {
  params: {},
  searchParams: { [key: string]: string | string[] | undefined },
}


const Home = ({searchParams}:PropsParams) => {
const router = useRouter()

const pathname = usePathname()

    const verifyUser = async()=>{
      try {
          const {data:verifiedUser} = await axios(`/api/auth/verifyUser/${searchParams.userid}`)
          storeSession(verifiedUser,localSessionName)
          router.replace('/')
      } catch (err:any) {
          console.error(err.response)
      }
    }




  useEffect(() => {
     if(searchParams.rejected && searchParams.rejectedtoken === rejectedToken){
      authBox(401,`So sorry you can't enter that page.`)
      router.replace('/')
    }
     if(searchParams.login && searchParams.rejectedtoken === rejectedToken){
      authBox(401,`you must login to perform operations on site.`)
      router.replace('/?login=true')
    }


    if(searchParams.verifyuser && searchParams.accesstoken === accepttoken){
        verifyUser()
    }
    
  }, [searchParams,pathname])
  
  return (<>
      {
        searchParams.login ?<LogIn/>:
        searchParams.signup && <SignUp/>
      }
      <InformationComponent/>
      <ShowItems/>
    </>
  )
}

export default Home
