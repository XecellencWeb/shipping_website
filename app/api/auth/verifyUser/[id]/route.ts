import Users from "@models/user"
import { connectMongo } from "@utils/dbconnect"
import {signToken} from '@utils/authenticateUsers'



export const GET = async(req:Request, {params}:any)=>{
        try {
            await connectMongo()
            const user = await Users.findById(params.id)

            user.isVerified = true
            await user.save()

            const token = signToken(user)

            return new Response(JSON.stringify({...user._doc,token}), {
                status:200
            })

        } catch (err:any) {
            return new Response(JSON.stringify(err.message), {status:err.status || 500})
        }
}