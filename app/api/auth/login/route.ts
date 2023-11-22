import Users from "@models/user"
import { signToken } from "@utils/authenticateUsers"
import { compare } from "@utils/bcrypt"
import { connectMongo } from "@utils/dbconnect"


export const POST = async(req:Request)=>{
    const {email,password} = await req.json()

    try {
        await connectMongo()
        const user = await Users.findOne({email})

        if(!user){
            return new Response(JSON.stringify('you must have an account to log in') ,{status:401})
        }

        const rightPassword = await compare(password,user.password)

        if(!rightPassword){
            return new Response(JSON.stringify('you entered the wrong password') ,{status:404})
        }


        if(!user.isVerified){
            return new Response(JSON.stringify('your acount must be verified to continue with us.'), {status:401})
        }

        const token = signToken(user)

        return new Response(JSON.stringify({...user._doc, token}), {
            status:200
        })

    } catch (err:any) {

        console.error(err)
        return new Response(JSON.stringify(err.message), {status:err.status || 500})
    }
}