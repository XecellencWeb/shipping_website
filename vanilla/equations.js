export const equate = (array)=>{
let quantity = 0
let totalWeight = 0
let totalPrice = 0


    for(const i of array){
        quantity += i.itemQuantity

        totalWeight += (i.itemQuantity * i.weightPerItem)
        totalPrice += (i.itemQuantity * i.itemPrice)
    }


    return {quantity,totalWeight,totalPrice}
}