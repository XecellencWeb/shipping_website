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

let message

transporter.sendMail(Mail).then(_=>{


        message = true


        return 'Sent'

    }).catch(_=>{

        message = false
        return 'an error occured.'
    })

    return message
}