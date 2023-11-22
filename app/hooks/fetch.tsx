'use client'

import { orderType } from '@components/Receipt'
import { useUserData } from '@context/userData'
import { useParams, usePathname } from 'next/navigation'
import {useEffect,useState}from 'react'

const useFetch = (url:any) => {

    const [loading,setLoading] = useState<boolean>(false)
    const [data,setData] = useState()
    const [err,setErr] = useState()

    const pathname = usePathname()
    const params = useParams()


//@ts-ignore
    const  {axiosSender} = useUserData()


    const fetchData = async(url:string)=>{

        setLoading(true)


        try {

            const {data} = await axiosSender(url)
            setData(data)
        } catch (error:any) {
            setErr(error)
        }finally{
            setLoading(false)
        }
    }


    useEffect(()=>{
            fetchData(url)
    },[url,pathname,params])



  return {data,err,loading,fetchData}
}

export default useFetch
