import Goods from "@models/trackedgoods"
import { verifyBoss } from "@utils/authenticateUsers"
import { connectMongo } from "@utils/dbconnect"

export const PATCH = async(req:Request, {params}:any)=>{
    const items = await req.json()

    const {itemsBought} = items
    
    let quantity = 0
    let totalWeight = 0

    for(const i of itemsBought){
        quantity += i.itemQuantity

        totalWeight += (i.itemQuantity * i.weightPerItem)
    }
    
    try {
        await connectMongo()
        if(!verifyBoss(params.userId)){
            return 
        }

        await Goods.findByIdAndUpdate(params.id,{quantity,totalWeight,...items},{new:true})
        const allItems = await Goods.find().sort({lastUpdated:-1})

        return new Response(JSON.stringify(allItems), {status:200})
    } catch (err:any) {
        return new Response(JSON.stringify(err.message), {status:err.status || 500})
    }
}