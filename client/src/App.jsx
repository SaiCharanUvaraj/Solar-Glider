import React from 'react'
import Location from './pages/Location'
import SignIn from './pages/SignIn/SignIn'
import Navbar from './components/Navbar/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Location />
      {/* <SignIn /> */}
    </div>
  )
}

export default App