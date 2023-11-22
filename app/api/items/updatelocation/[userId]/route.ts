import { generateEmail } from "@constants/text"
import Goods from "@models/trackedgoods"
import { verifyBoss } from "@utils/authenticateUsers"
import { connectMongo } from "@utils/dbconnect"
import { sendMail } from "@utils/mailsender"

export const PATCH  = async(req:Request, {params}:any)=>{

    const {newLocation,itemId,status} = await req.json()

    try {
        if(!verifyBoss(params.userId)){
            return new Response(JSON.stringify('you are not authenticated'), {status:401})
        }
        await connectMongo()

        const item = await Goods.findById(itemId)

        item.currentLocation = newLocation

        item.status = status
        item.lastUpdated = new Date()

        await item.save()

        
        const message = 'Sir, the goods you are expecting from spear gate shipping company current location has just been updated. please Visit our Website to see update.'
        const subject = 'Your Goods current Location has just be Updated'
        
        const html = generateEmail({
                subject,
                message,
                name:'Sir'
        },{
            linkname:'View update',
            linkurl:`${process.env.WEBSITE_URL}/userprofile`
        })
        try {
            for(const i of item.ownersEmail){
                await sendMail({
                    to:i,
                    subject,
                    html
                })
    
                }
        } catch (err:any) {
            console.error(err)

            return new Response(JSON.stringify(err.message), {status:err.status || 500})
        }
        

        const allItems = await Goods.find().sort({lastUpdated:-1})

        return new Response(JSON.stringify(allItems), {status:200})

    } catch (error:any) {
        return new Response(JSON.stringify(error.message), {status:error.status || 500})
    }


}