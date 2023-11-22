'use client'

import {useState} from 'react'
import FormElements, { formElements } from './FormElements'
import SignInWithProvider from './SignInWithProvider'
import Link from 'next/link'
import { authBox } from '@vanilla/box/authbox'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { storeSession } from '@vanilla/session'
import { localSessionName } from '@constants/tokens'
import Loader from '@components/Loader'
import { useUserData } from '@context/userData'




const LogIn = () => {
    const {loggedInUser}:any = useUserData()
    const navigate = useRouter()

    const [email,setEmail] = useState()
    const [password,setPassword] = useState()


    const [isLoading, setIsLoading] = useState<boolean>(false)


    const details:formElements[] = [
      {
        name:'Email',
        type:'input',
        value:'email',
        state:setEmail
      },
      {
        name:'Password',
        type:'input',
        value:'password',
        state:setPassword
      },
    ]


    const sumbitForm = async(e:any)=>{
      e.preventDefault()

      if(!email || !password){
        return authBox(400, 'All fields are required')
      }


      try {
        setIsLoading(true)
       const user = await axios.post(`/api/auth/login`, {
          email,password
        })

        alert('successfull')
        storeSession(user.data,localSessionName)
        navigate.push('/')

      } catch (err:any) {
        authBox(err.status, err.response.data)
        console.error(err.response)
      }finally{
        setIsLoading(false)
      }
      
    }


if(loggedInUser){

  navigate.replace('/')
  return
}



  return (

    <div className='w-screen h-[500vh] absolute top-0 left-0 isolate z-50'>
      <div className="bg-black opacity-30 w-full h-full blur-lg absolute top-0 left-0 -z-10"/>
      <div className="wrapper min-h-[70vh] rounded-[1rem] bg_background absolute mt-20 top-0 left-1/2 -translate-x-1/2">
        <form onSubmit={sumbitForm} action="" className="small_wrapper_xx flex mt-20 flex-col gap-2 mx-auto">
          <h1 className="mb-8 text-center font-bold">Log In</h1>
            {
              details.map(
                (input,index)=>(
                  <FormElements key={index} {...input}/>
                )
              )
            }


            <Link href='/?signup=true' className='text-blue-800 border-b-[.5px] border-solid border-blue-800 self-end mt-4 w-fit'>Dont't have an account Sign Up</Link>

            <SignInWithProvider/>

            {isLoading?
            (
              <Loader/>
            )
            :<button className='w-full items-center justify-center h-16 hover:bg-blue-800 bg-slate-400 rounded-full dark:bg-gray-700'>Submit</button>}
        </form>
      </div>
    </div>
  )
}

export default LogIn
