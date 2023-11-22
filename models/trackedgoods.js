import {model, models, Schema} from "mongoose";


const goodsSchema = new Schema({
    name: String,
    description: String,
    quantity: Number,
    currentLocation: String,
    owners:{
        type:[String],
        default:[]
    },
    ownersEmail:{
        type:[String],
        default:[]
    },
    status:{
        type:String,
        default:'comming'
    },
    lastUpdated: {
        type:Date,
        immutable:false,
        default:()=> Date.now()
    },
    // Additional properties
    address: String,
    clientNumber: String,
    totalWeight: Number, // Represented in kg
    deliveryMethod: String,
    itemsBought: [{
      itemName: String,
      itemQuantity: Number,
      itemPrice: Number,
      weightPerItem: Number,
}],
createdAt: {
    type:Date,
    default:()=>Date.now(),
    immutable:true
}
})


const Goods = models.TrackedGoods || model('TrackedGoods',goodsSchema)

export default Goods