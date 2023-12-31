import { cookiename } from "@constants/tokens"
import Goods from "@models/trackedgoods"
import { verifyBoss } from "@utils/authenticateUsers"
import { connectMongo } from "@utils/dbconnect"

export const GET = async(req:Request, {params}:any)=>{
    try {
        await connectMongo()

        if(!verifyBoss(params.userId)){
            return new Response(JSON.stringify('only boss can get all goods'), {status:401})
        }

        const allItems:any = await Goods.find({
            shipped: {$in: [true,null]}
        }).sort({lastUpdated:-1})

        return new Response(JSON.stringify(allItems), {status:200})
    } catch (err:any) {
        console.error(err)
        return new Response(JSON.stringify(err.message), {status:err.status || 500})
    }
}