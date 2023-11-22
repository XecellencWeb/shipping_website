import {connectMongo} from '@utils/dbconnect'
import {sendMail} from '@utils/mailsender'
import Users from '@models/user'
import {generateEmail, verifytext} from '@constants/text'
import { accepttoken } from '@constants/tokens'
import {hashpassword} from '@utils/bcrypt'

export const POST = async(req:Request)=>{
    const {email,password:sentpassword,name} = await req.json()

    try {
        await connectMongo()


        console.log('First')
        const hashedpassword = await hashpassword(sentpassword,8)


        console.log('started')


        console.log(sentpassword,hashedpassword)

        const user = await Users.create({
            email,password:hashedpassword,name
        })
        
        console.log('created')

        const subject = 'verify your email account'
        await sendMail({
            to:email,
            subject,
            html:generateEmail({
                subject,
                message:verifytext,
                name
            },{
                linkname:'Verify Email',
                linkurl:`${process.env.WEBSITE_URL}/?verifyuser=true&userid=${user._id}&accesstoken=${accepttoken}`
            })
        })


        return new Response(JSON.stringify('User created'), {status:200})
    
    } catch (err:any) {

        console.error(err)
        return new Response(JSON.stringify(err.message), {status:err.status || 500})
    }


}