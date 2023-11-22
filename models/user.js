import {model, models, Schema} from "mongoose";


const userSchema = new Schema({
    name:{
        type:String,
        require:[true, 'Name must be provided']
    },
    email:{
        type:String,
        require:[true, 'Email must be required']
    },
    password:{
        type:String,
        require:[true, 'Password must Be provided']
    },
    isBoss:{
        type:Boolean,
        default:false,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:()=> Date.now()
    }
})


const Users = models.Users || model('Users',userSchema)

export default Users