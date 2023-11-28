'use client'


import {useEffect, useState} from 'react'
import { Services } from '@components/Header'
import { IntroductionText } from '@components/Header'
import person1 from '@assets/person1.jpg'
import person2 from '@assets/person2.jpg'
import person3 from '@assets/person3.jpg'
import aeroplane from '@assets/aeroplane.jpg'
import ship from '@assets/ship.jpeg'
import train from '@assets/train.jpg'
import { websiteName } from '@constants/text'
import  Image  from 'next/image'
import ShowItems from '@components/ShowItems'


const InAnimations = [
  'scale_in_out',
  'slide_in_out'
]





const testimonies = [
  {
    name:'Carlos I. Harris',
    remark:`I couldn't be happier with the service provided by ${websiteName}. From the moment I submitted my order to the prompt delivery at my doorstep, the entire process was seamless. The real-time tracking feature kept me informed at every step, and the package arrived right on schedule in perfect condition. I highly recommend ${websiteName} for their reliability and top-notch customer service!`,
    image:person1
  },
  {
    name:'Carlos I. Harris',
    remark: `As an e-commerce business owner, reliable shipping is crucial to my success. I switched to ${websiteName} a few months ago, and it has been a game-changer for my business. The shipping rates are competitive, and the speed of delivery is impressive. My customers have noticed the improvement, and positive reviews have been pouring in. Thanks to ${websiteName}, I can confidently say that my shipping worries are a thing of the past! `,
    image:person2
  },
  {
    name:'Carlos I. Harris',
    remark:`I want to express my gratitude to ${websiteName} for their exceptional service. I recently had to send a time-sensitive package to a friend overseas, and I was amazed at how efficiently and quickly it was delivered. The customer support team was also incredibly helpful and responsive, guiding me through the process and addressing my concerns. ${websiteName} exceeded my expectations, and I will definitely be using their services again in the future.`,
    image:person3
  },
]


const aboutUs =  [
  `At ${websiteName}, we're more than just a logistics service – we're your dedicated partner in seamless and dependable shipping. Imagine a team of professionals committed to ensuring your packages arrive at their destination effortlessly.`,
  
  "Our story is one of simplicity and reliability, spanning across the globe. We understand that in a world where time is of the essence, a smooth shipping experience is invaluable. That's why we've built a team and a system that prioritizes your shipments, whether they're headed across town or around the world.",
  
  "Who are we? We're a passionate group of logistics enthusiasts who believe in making shipping straightforward. Our focus is on you – your satisfaction, your peace of mind, and your confidence in our ability to get your packages where they need to go. And here's the key: We have branches around the world to ensure your goods are seamlessly shipped, no matter where they need to go. Our global reach means that your packages are in safe hands from pickup to delivery."
];






const shippingServices = [
  {
    title: "Air Shipping Service",
    image:aeroplane,
    description: "Experience the unparalleled speed and efficiency of our Air Shipping Service. Ideal for time-sensitive deliveries, our air freight solutions ensure that your packages reach their destination swiftly."
  },
  {
    title: "Sea Shipping Service",
    image:ship,
    description: "Dive into the reliability of our Sea Shipping Service, your gateway to cost-effective and secure maritime logistics. Whether you're shipping large quantities of goods or oversized items, our sea freight solutions provide the capacity and flexibility you need."
  },
  {
    title: "Land Shipping Service",
    image:train,
    description: "Grounded in efficiency, our Land Shipping Service is designed to meet your domestic transportation needs seamlessly. Whether it's regional deliveries or nationwide distribution, our land freight solutions offer a reliable and cost-efficient option. "
  }
];










const index = () => {

  const [activeSlide,setActiveSlide] = useState<number>(0)
  const [currentAnimator, setCurrentAnimator] = useState<number>(0)
  const [activeService,setActiveService] = useState<number>(0)

  console.log(currentAnimator)




  const incrementState = (parent:object[] | string[],state:number,setter:any,time?:number)=>{
    
    const totalCount = parent.length - 1
    



    setTimeout(()=>{
      
      
      if(state < totalCount){

        //@ts-ignore
          setter(prev => prev + 1)
      }else{
        //@ts-ignore
          setter(prev => prev - prev)
      }
  
    },time || 10000)
  }






              useEffect(()=>{


              incrementState(testimonies,activeSlide,setActiveSlide)
                

                
              },[activeSlide])



              useEffect(()=>{


              incrementState(InAnimations,currentAnimator,setCurrentAnimator)
                

                
              },[currentAnimator])




              useEffect(()=>{


              incrementState(shippingServices,activeService,setActiveService)
                

                
              },[activeService])







  return (
    <div className='wrapper'>
      <p className="mt-8 sm:hidden">
        {IntroductionText}
      </p>
      <div className="xl:hidden my-20 flex gap-10 max-md:flex-col">
      {
                Services.map(
                  (service,index)=>(
                    <div key={index} className="flex w-full gap-2 bg-white bg-opacity-70 dark:bg-opacity-20 p-8 rounded-[1rem]">
                      <i className={service.emoji + ' text-[1.2rem] '}>
                      </i>
                      <div className="">
                        <h1 className="text-[2rem] ">{service.name}</h1>
                        <p className="text_1 mt-2 ">{service.description}</p>
                        
                      </div>
                    </div>
                  )
                )
              }
      </div>
      <div className="my-20">
        {
          testimonies?.map(
            (text,key)=>(
              <div key={key} className={`flex flex-col items-center small_wrapper gap-2 relative ${key === activeSlide ?InAnimations[currentAnimator]: 'hidden'}`}>

              <Image key={key} src={text.image} alt='textimony Image' className='rounded-full w-40 h-40'/>
              <p className="text-center text-base font-thin font_grandi">
                {text.remark}
              </p>
              <h1 className="text-3xl font-semibold text-blue-900">{text.name}</h1>
              </div>
            )
          )
        }
      </div>

      <div className="my-40">
        <h1 className="font_croissant text-5xl font-bold mb-4">About Us</h1>
        <div className="px-4">
        {
          aboutUs?.map(
            (about,key)=>(
              <p key={key} className="mb-8 opacity-75">{about}</p>
            )
          )
        }
        </div>
      </div>


      <div className="my-40">
          <h1 className="font_croissant text-5xl font-bold mb-8">Services</h1>
          <div className="flex flex-col lg:flex-row gap-5 lg:h-[50vh]">
            {
              shippingServices?.map(
                (service,key)=>(
                  <div key={key} onClick={()=>setActiveService(key)} className={`${activeService !== key ? 'opacity-50 scale-y-90 blur-[2px]': 'border-[.5rem] border-solid border-blue-700'} transition-all w-full relative isolate flex items-end h-full  max-lg:min-h-[60vh] overflow-hidden rounded-[1rem]`}>
                      <Image src={service.image} alt='shipping service image' className='w-full h-full absolute -z-10 object-cover'/>
                    <div className="bg-white bg-opacity-75 p-4  max-sm:h-[70%] ">
                      <h1 className="text-gray-700 font_alp font-bold text-3xl my-2">{service.title}</h1>
                      <p className="font_grandi text-gray-700 text-base">{service.description}</p>
                    </div>
                  </div>
                )
              )
            }
          </div>
      </div>
      <ShowItems/>
    </div>
  )
}

export default index
