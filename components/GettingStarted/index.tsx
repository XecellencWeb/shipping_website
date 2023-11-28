'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const GettingStarted = () => {

    const [shrinker,setShrinker] = useState<boolean>(false)



  return (
    shrinker?
    <div className='sticky -bottom-5 w-32 h-32 flex items-center justify-center rounded-full border-2 border-slate-300 border-opacity-50'>
        <div className="absolute -top-16 left-1/2 flex gap-1 items-center">
        <i className="bi bi-play-circle text-5xl"></i>
            <Link href='/calculateshipping' className='px-4 py-2 bg-slate-50 bg-opacity-50  text-base block w-32  m-4 rounded-lg'>Get Started</Link>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 left-32 flex gap-1 items-center">
        <i className="bi bi-sign-railroad text-5xl"></i>
            <button className='px-4 py-2 bg-slate-50 bg-opacity-50  text-base block w-40  m-4 rounded-lg '>track goods</button>
        </div>
        <button onClick={()=>setShrinker(false)} className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500"><p className="">x</p></button>
    </div>
    :(
        <div className='sticky -bottom-5 w-32 h-32 flex items-center justify-center rounded-full'>
        
        <button onClick={()=>setShrinker(true)} className="flex items-center justify-center px-4 py-2 rounded-full bg-blue-500">
        <p className="text-base text-white">Get Started</p>
        </button>
    </div>
    )
  )
}

export default GettingStarted