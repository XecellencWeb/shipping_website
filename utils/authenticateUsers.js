import { cookiename } from "@constants/tokens";
import { serialize } from "cookie";
import { sign,verify } from "jsonwebtoken"
import {headers} from 'next/headers'

const max_age = 60 * 60 * 24 * 30; //days


export const signToken = (user)=>{
    const token = sign(
        {
            id:user._id,
            inControl:user.isBoss
        },
        process.env.auth_token,
        {
            expiresIn: max_age
        }
    )

    return token
}




export const authenticate = (user)=>{

    
    const token = signToken(user)
    

    const seralized = serialize(cookiename, token , {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: max_age,
        path: '/'
    })

    return seralized
}






export const verifyToken = ()=>{


    const token = headers().get('Authorization')



    if(!token){
        return false
    }

    try {
       const authInfo = verify(token,process.env.auth_token)

        return authInfo
    } catch (err) {
        return false
    }
}


export const verifyUser = (userId)=>{
    const {id,inControl} = verifyToken()

    if(id !== userId){
        return false
    }

    return {isBoss:inControl}
}


export const verifyBoss = (userId)=>{
    const {id,inControl} = verifyToken()

    if(id === userId && inControl ){
        return true
    }
    return false
}