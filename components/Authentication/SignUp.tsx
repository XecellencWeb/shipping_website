'use client'

import {useState} from 'react'
import FormElements, { formElements } from './FormElements'
import SignInWithProvider from './SignInWithProvider'
import Link from 'next/link'
import axios from 'axios'
import { authBox } from '@vanilla/box/authbox'
import Loader from '@components/Loader'
import { useUserData } from '@context/userData'
import { useRouter } from 'next/navigation'



const SignUp = () => {
  
  const {loggedInUser}:any = useUserData()
  const navigator = useRouter()

    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [name,setName] = useState()

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
      {
        name:'Your Name',
        type:'input',
        value:'text',
        state:setName
      },
    ]


    const sumbitForm = async(e:any)=>{
      e.preventDefault()

      if(!email || !password || !name){
        return authBox(400, 'All fields are required')
      }


      try {
        setIsLoading(true)
        await axios.post(`/api/auth/createuser`, {
          email,password,name
        })

        alert('Your sign up request was successfull. please check your email to verify your account')
      } catch (err:any) {
        console.error(err.response)
      }finally{
        setIsLoading(false)
      }
    }



    if(loggedInUser){

      navigator.replace('/')

      return
    }







  return (
    <div className='w-screen h-[500vh] absolute top-0 left-0 isolate  z-50'>
      <div className="bg-black opacity-30 w-full h-full blur-lg absolute top-0 left-0 -z-10"/>
      <div className="wrapper min-h-[70vh] rounded-[1rem] bg_background absolute mt-20 top-0 left-1/2 -translate-x-1/2">
        <form onSubmit={sumbitForm} action="" className="w-96 flex mt-20 flex-col gap-2 mx-auto">
          <h1 className="mb-8 text-center font-bold">Sign Up</h1>
            {
              details.map(
                (input,index)=>(
                  <FormElements key={index} {...input}/>
                )
              )
            }
            <Link href='/?login=true' className='text-blue-800 border-b-[.5px] border-solid border-blue-800 self-end mt-4 w-fit'>Have an Account Log In</Link>
            <SignInWithProvider/>

            {isLoading? (
                <Loader/>
            ):<button className='w-full items-center justify-center h-16 hover:bg-blue-800 bg-slate-400 rounded-full dark:bg-gray-700'>Submit</button>}
        </form>
      </div>
    </div>
  )

}

export default SignUp
