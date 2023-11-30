import { generateEmail } from "@constants/text"
import Goods from "@models/trackedgoods"
import { verifyBoss } from "@utils/authenticateUsers"
import { connectMongo } from "@utils/dbconnect"
import { sendMail } from "@utils/mailsender"

export const PATCH  = async(req:Request, {params}:any)=>{

    const newLocationData = await req.json()

    const {itemId,newLocation} = newLocationData

    try {
        if(!verifyBoss(params.userId)){
            return new Response(JSON.stringify('you are not authenticated'), {status:401})
        }
        await connectMongo()

        const item = await Goods.findById(itemId)

        item.currentLocation = newLocation

        item.status = newLocationData.status || 'comming'
        item.lastUpdated = new Date()
        item.shipped = newLocationData?.shipped || item?.shipped || null

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
        
           await sendMail({
                    to:item.ownersEmail,
                    subject,
                    html
                })
                

        
        

                const allItems:any = await Goods.find({
                    shipped: {$in: [true,null]}
                }).sort({lastUpdated:-1})

        return new Response(JSON.stringify(allItems), {status:200})

    } catch (error:any) {
        return new Response(JSON.stringify(error.message), {status:error.status || 500})
    }


}