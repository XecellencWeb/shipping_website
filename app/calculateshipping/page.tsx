import React from 'react'
import Header from '@components/Header'
import FormGenerator from '@components/FormGenerator'
import ItemEdit from '@components/ShowsItemsAdmin/ItemEdit'

const CalculateShippingPage = () => {
  return (
    <>
        <Header displayText='Get Started with getting the best service ever.' homePage={false}/>
        
        <ItemEdit method='Calculate'/>
    </>
  )
}

export default CalculateShippingPage