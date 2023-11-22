import { error } from 'console'
import nodemailer from 'nodemailer'

export const sendMail = async(mail)=>{
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth:{
            user:process.env.EMAIL,
            pass: process.env.EMAIL_PASSKEY
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

    }).catch(error =>{

        message.through = false

        message.error = error
        return 'an error occured.'
    })

    return message
}