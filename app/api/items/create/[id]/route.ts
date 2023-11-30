import { connectMongo } from "@utils/dbconnect"
import Goods from '@models/trackedgoods'
import { verifyBoss } from "@utils/authenticateUsers"
import {equate} from '@vanilla/equations'

export const POST = async (req:Request,{params}:any)=>{
    const items = await req.json()

    const {itemsBought} = items
    

    const {quantity,totalWeight,totalPrice} = equate(itemsBought)



    try {

        await connectMongo()
        if(!verifyBoss(params.id)){
            return new Response(JSON.stringify('you are not authenticated'), {status:401})
        }

        const newItem:any = await Goods.create({...items,quantity,totalWeight,totalPrice})

        const allItems:any = await Goods.find({
            shipped: {$in: [true,null]}
        }).sort({lastUpdated:-1})

        return new Response(JSON.stringify(allItems), {status:200})


        
    } catch (err:any) {



        
        console.error(err)
        return new Response(JSON.stringify(err.message), {status:err.status || 500})




    }
}