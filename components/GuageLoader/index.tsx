import React from 'react'

const GaugeLoader = () => {
  return (
    <div className='guage_container relative'>
        <div className="guage"/>
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-base guage_text">Calculating</p>
    </div>
  )
}

export default GaugeLoader