import { connectMongo } from "@utils/dbconnect"
import Goods from '@models/trackedgoods'
import { verifyBoss } from "@utils/authenticateUsers"


export const POST = async (req:Request,{params}:any)=>{
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
        if(!verifyBoss(params.id)){
            return new Response(JSON.stringify('you are not authenticated'), {status:401})
        }

        const newItem:any = await Goods.create({...items,quantity,totalWeight})

        const allItems:any = await Goods.find().sort({lastUpdated:-1})

        return new Response(JSON.stringify(allItems), {status:200})


        
    } catch (err:any) {



        
        console.error(err)
        return new Response(JSON.stringify(err.message), {status:err.status || 500})




    }
}