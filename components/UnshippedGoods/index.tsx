


import { orderType } from '@components/Receipt'
import Goods from './Goods'

import {useState} from 'react'







export type UnshippedGoods = orderType & {
    shipped:boolean
}

type UnshippedGoodsProps = {
    data:UnshippedGoods[] | undefined,
    isBoss?:boolean
}




const UnshippedGoods = ({data,isBoss}:UnshippedGoodsProps) => {

    








  return (
    <div className='wrapper '>
        <div className="">
            {
                data?.map(
                    (goods)=>(
                        <Goods key={goods._id} isBoss={isBoss} goods={goods}/>
                    )
                )
            }
        </div>
    </div>
  )
}

export default UnshippedGoods