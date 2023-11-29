


import { orderType } from '@components/Receipt'
import Goods from './Goods'

import {useState} from 'react'







export type UnshippedGoods = orderType & {
    shipped:boolean
}

type UnshippedGoodsProps = {
    data:UnshippedGoods[]
}




const UnshippedGoods = ({data}:UnshippedGoodsProps) => {

    








  return (
    <div className='wrapper '>
        <div className="">
            {
                data?.map(
                    (goods)=>(
                        <Goods key={goods._id} goods={goods}/>
                    )
                )
            }
        </div>
    </div>
  )
}

export default UnshippedGoods