import User from '@models/user'
import { connectMongo } from '@utils/dbconnect'
import  {signToken} from '@utils/authenticateUsers'
import { cookies } from 'next/headers'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks:{
        async session({session}){
                const currentUser = await User.findOne({
                    email: session.user.email
                })
                session.user.id = currentUser._id.toString()

                const token = signToken(currentUser)


                session.user = {...currentUser._doc,token}
            

                return session
                
        },
        async signIn ({profile}){
            try {
                await connectMongo()
                const userExist = await User.findOne({
                    email:profile.email
                })
                if(!userExist){
                    await User.create({
                        email:profile.email,
                        name: profile.name,
                        password: profile.name.replace(/ /g,''),
                        isVerified: true
                    })
                }
            

                return true
            } catch (err) {
                return false
            }
        }
    }
})


export {handler as GET, handler as POST}