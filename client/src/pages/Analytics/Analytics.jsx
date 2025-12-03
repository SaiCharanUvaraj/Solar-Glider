import React from 'react'
import Battery from './Battery/Battery'
import Speed from './Speed/Speed'
import Altitude from './Altitude/Altitude'

const Analytics = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 w-full">
      <Battery />
      <Speed />
      <Altitude />
    </div>
  )
}

export default Analytics