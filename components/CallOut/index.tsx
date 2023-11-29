import React from 'react'

const CallOut = ({unshippedSeen,setter,numberofShipped,numberofUnshipped}:{
    setter:any,
    unshippedSeen:boolean,
    numberofShipped:number,
    numberofUnshipped:number
}) => {



    const manipulateSetter = ()=>{
        //@ts-ignore
        setter(prev => !prev)
    }
    




  return (
    <div className='sticky top-3/4 w-screen h-40' >
        <div onClick={manipulateSetter} className="absolute flex gap-3 items-center right-0 mr-12 top-1/2 -translate-y-1/2 cursor-pointer">

            <div className={`w-20 relative h-20 flex items-center justify-center ${unshippedSeen?' bg-pink-500':' bg-blue-600'} transition-all rounded-full hover:scale-90`}>
                <p className="absolute w-8 h-8 bg-white rounded-full top-0 -translate-y-1/2 left-0 flex justify-center items-center -translate-x-1/2"><span className='font-semibold font-sans text-gray-700'>{unshippedSeen?numberofShipped:numberofUnshipped}</span></p>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff" className="bi bi-chat-left-text" viewBox="0 0 16 16">
            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"/>
            </svg>

            </div>

            <p className="text-base font-bold px-4 py-2 bg-white hover:bg-blue-600 dark:bg-opacity-20 bg-opacity-50 rounded-lg">{unshippedSeen?'Shipped':'UnShipped'} Goods</p>

        </div>
    </div>
  )
}

export default CallOut