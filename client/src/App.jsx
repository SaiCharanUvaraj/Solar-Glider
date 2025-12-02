import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Root from './Root'
import "./App.css"

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Root />
      </div>
    </BrowserRouter>
  )
}

export default App