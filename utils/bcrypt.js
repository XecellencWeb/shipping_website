import bcrypt from 'bcryptjs'

export const hashpassword = async(password,salt)=>{
    
        const hashed = await bcrypt.hash(password,salt)
        return hashed
    
}

export const compare = async(password, hashedpassword)=>{
    
        const right = await bcrypt.compare(password,hashedpassword)
        return right
    
}