import React from 'react'
import Shipping from '@assets/shipping_background.jpg'
import Image from 'next/image'
import { websiteName } from '@constants/text'

const welcomeHeader:String = "Welcome to the best shipping platform"
const welcomeText:String = 'You can trust us with all your shipping'
export const IntroductionText:String = `Welcome to ${websiteName}, where your shipping experience is not just a service; it's a commitment to excellence. Discover a world of convenience and reliability as we redefine the way you send and receive packages with our three core promises: Speed in Delivery, Trusted Services, and the Best Shipping Providers`

type ShippingServices = {
  name:String,
  emoji:string,
  description:String
}





export const Services:ShippingServices[] = [
  {
    name:'Speed in Delivery',
    emoji:"bi bi-speedometer",
    description:`At ${websiteName}, we understand the value of time in today's fast-paced world. That's why we prioritize speed in delivery to ensure your packages reach their destination swiftly and efficiently. `
  },
  {
    name:'Trusted Service',
    emoji:"bi bi-briefcase-fill",
    description:`We prioritize building and maintaining that trust with our customers. Our commitment to reliability, transparency, and customer satisfaction sets us apart.`
  },
  {
    name:'The Best Shipping Providers',
    emoji:"bi bi-buildings-fill",
    description:`We believe in offering nothing but the best for our customers. That's why we have partnered with the leading shipping providers in the industry.`
  },
]

type headerProps = {
  homePage?: boolean,
  displayText?: string
}





const index = ({homePage, displayText}:headerProps) => {
  return (
    <div className={`w-screen h-[70vh] ${homePage ?'sm:h-screen': 'sm:h-[70vh]'} isolate relative -top-20`}>
      <Image src={Shipping} alt='Cover Photo' className='absolute top-0 left-0 w-screen h-full object-cover -z-10' />
       
       
       <div className="pt-20 wrapper h-full flex justify-between gap-5 text-white">
        <div className="flex h-full flex-col max-xl:justify-center w-full">
            <h1 className="font_monoton text-[3rem] lg:text-[6rem] text-white break-words stroke_design">{displayText || welcomeHeader}</h1>

           { homePage && <>
           <p className="mt-8 text-white">{welcomeText}</p>
            <p className="mt-12 mr-8 max-sm:hidden text-base text-white">{IntroductionText}</p>
            </>}
          </div>
          <div className=" xl:block hidden w-[40%] text-white">
            <div className="w-full flex flex-col gap-10 text-white">
              {homePage &&
                Services.map(
                  (service,index)=>(
                    <div key={index} className="flex w-full gap-2 bg-white bg-opacity-20 p-8 rounded-[1rem] text-white">
                      <i className={service.emoji + ' text-[1.2rem] text-white fill-white'}>
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
        </div>
    </div>
  )
}

export default index
