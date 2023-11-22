

import React from 'react'
import { ButtonProvider, btnProvider } from './FormElements'
import GoogleImage from '@assets/google-icon.png'
import {signIn, getProviders} from 'next-auth/react'


const SignInWithProvider = () => {


    
    



    const Providers:btnProvider[] = [
        {
            name:'Google',
            image:GoogleImage,
            signInFunction:signIn
        }
    ]

    return (
    <div className="mt-20">
        {
           Providers.map(
                (provider,index)=>(
                    <ButtonProvider key={index} {...provider}/>
                )
            )
        }
    </div>
  )
}

export default SignInWithProvider
