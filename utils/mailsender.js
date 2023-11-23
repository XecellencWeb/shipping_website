
import nodemailer from 'nodemailer'

export const sendMail = async(mail)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user:'excellencejosiah@gmail.com',
            pass: 'tmjx tdnh qfeg xilc'
        }
    })

    const {to,subject,html} = mail

    const Mail = {
        from: process.env.EMAIL,
        to,subject,
        html: html
    }

const message = {}

transporter.sendMail(Mail).then(_=>{


        message.through = true


        return 'Sent'

    }).catch(_ =>{

        
        throw new Error('an error occured.')
    })

    return message
}