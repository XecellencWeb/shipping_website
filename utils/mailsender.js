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


    
    transporter.sendMail(Mail).then(_=>{
        return 'Sent'
    }).catch(_=>{
        return 'an error occured.'
    })
}