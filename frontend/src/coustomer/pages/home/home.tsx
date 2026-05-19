import React from 'react'
import ElectronicCategory from './ElectromicCatagary/ElectronicCatagory'
import Grid from './Grid/Grid'
import Deal from './deal/Deal'
import Homecategory from './Homecategory/homecategory'
const home = () => {
  return (
    <div>
      <ElectronicCategory/>
      <Grid/>
      <div className="my-15"> 
        <h2 className="text-2xl font-bold text-center">Today's Deal</h2>
        <Deal/>
      </div>
     <div>
      <h2 className="text-2xl font-bold text-center p-17">Shop By Category </h2>
      <Homecategory/>
     </div>
    
    </div>
  )
}

export default home