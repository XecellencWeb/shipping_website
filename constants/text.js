export const verifytext = `

Thank you for creating an account with spear gate shipping company. You are now ready to experience the best the best shipping service ever but you have one step left.To ensure the security of your account, please verify your email address by clicking on the following link:

`

export const websiteName = 'Shipping Website'





export const generateEmail = ({subject,message,name},{linkname,linkurl})=>{

    return `<html><body style="min-height: 100vh; font-family: sans-serif;">
    <div style="position: relative; width: min(100% - 2rem, 150ch); height: 10vh; display: flex; align-items: center; margin-inline: auto; margin-bottom: 5rem; ">
        <img src="https://firebasestorage.googleapis.com/v0/b/josiah-world-a69ae.appspot.com/o/logo.png?alt=media&token=dc3e27ec-0eb7-475d-afa9-33aabb33d40b" alt="logo" style="position: absolute; top: 0;
    left: 0; width: 70px; height: 70px;" >
    </div>
    <div style="width: min(100% - 5rem, 48rem); min-height: 30vh; border: 2px solid rgb(93, 93, 161); padding: 2rem; border-radius: 2rem; margin-inline: auto;">
        <h1 style="text-align: center; word-break: break-all; line-height: 1.1;">${subject}</h1>
        <p style="color: gray; margin-top: 1rem;" >Hi ${name},</p>
        <p style="color: gray; line-height: 1.5;">${message}
        ${linkname && `<a href="${linkurl}" style="background-color: rgb(62, 184, 184); color: white; margin-inline: auto; margin-block: 3rem; border-radius: 2rem; padding-inline: 3rem; padding-block: 1rem; display: block; width: 5rem;">${linkname}</a>`}
        </p>
        <p style="color: gray; line-height: 1.5; margin-top: 2rem;">
            Best regards,<br/>
            Spear gate shipping company
        </p>
    </div>
    </body></html>
    `
}