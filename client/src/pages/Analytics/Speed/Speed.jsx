import React from 'react'
import SpeedBarChart from './SpeedBarChart'

const Speed = () => {
  return (
    <div className="backdrop-blur-lg bg-[#00334E]/20 border border-[#00334E]/20 shadow-lg rounded-2xl p-2">
        <p className="text-2xl text-[#E8E8E8] text-center font-semibold">Flight Speed</p>
        <SpeedBarChart />
    </div>
  )
}

export default Speed