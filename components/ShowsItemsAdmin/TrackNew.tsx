'use client'


import {useState} from 'react'
import ItemEdit from './ItemEdit'

const TrackNew = () => {

  const [create,setCreate] = useState<boolean>(false)



  return (
    <div className='my-20'>
      <button onClick={()=>setCreate(true)}  className="flex bg-orange-400 opacity-80 hover:opacity-100  px-12 sm:px-20 py-4 rounded-full gap-2 items-center">
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#333" className="bi bi-plus-lg" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
      </svg> 
      <p className="text-base text-white">Create New</p>
      </button>

      {
        create && (
          <ItemEdit  cancelBtn = {setCreate} method='create'/>
        )
      }


    </div>
  )
}

export default TrackNew
