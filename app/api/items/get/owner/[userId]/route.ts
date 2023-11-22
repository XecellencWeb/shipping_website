import { cookiename } from "@constants/tokens"
import Goods from "@models/trackedgoods"
import { verifyUser } from "@utils/authenticateUsers"
import { connectMongo } from "@utils/dbconnect"

export const GET = async(req:Request, {params}:any)=>{
    try {
        await connectMongo()
        if(!verifyUser(params.userId)){
            return new Response(JSON.stringify('you cant access this page'), {status:401})
        }

        const ownerItems = await Goods.find({owners:params.userId}).sort({lastUpdated: -1})


        return new Response(JSON.stringify(ownerItems), {status:200})
    } catch (err:any) {
        return new Response(JSON.stringify(err.message), {status:err.status || 500})
    }
}