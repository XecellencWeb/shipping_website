import { cookiename } from "@constants/tokens"
import Goods from "@models/trackedgoods"
import { verifyUser } from "@utils/authenticateUsers"
import { connectMongo } from "@utils/dbconnect"

export const PATCH = async(req:Request,{params}:any)=>{
    const {id,email} = await req.json()

    try {
        await connectMongo()

        const roleOfUser = verifyUser(params.id)

        if(!roleOfUser){
            return new Response(JSON.stringify('you must login to find goods') , {status:401})
        }


        if(roleOfUser.isBoss){
            return new Response(JSON.stringify(`You can't find Product with this account. Login with a user account to find product, if you are testing`) , {status:401})
        }

        const item = await Goods.findById(id)

        item.owners.push(params.id)
        item.ownersEmail.push(email)

        await item.save()

        return new Response(JSON.stringify(item), {status:200})

    } catch (err:any) {
        return new Response(JSON.stringify(err.message), {status:err.status || 500})
    }
}