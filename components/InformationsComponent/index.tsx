import React from 'react'
import { Services } from '@components/Header'
import { IntroductionText } from '@components/Header'



const index = () => {
  return (
    <div className='wrapper'>
      <p className="mt-8 sm:hidden">
        {IntroductionText}
      </p>
      <div className="xl:hidden my-20 flex gap-10 max-md:flex-col">
      {
                Services.map(
                  (service,index)=>(
                    <div key={index} className="flex w-full gap-2 bg-white bg-opacity-20 p-8 rounded-[1rem] text-white">
                      <i className={service.emoji + ' text-[1.2rem] text-white'}>
                      </i>
                      <div className="">
                        <h1 className="text-[2rem] text-white">{service.name}</h1>
                        <p className="text_1 mt-2 text-white">{service.description}</p>
                        
                      </div>
                    </div>
                  )
                )
              }
      </div>
    </div>
  )
}

export default index
