import React from 'react'
import { Route, Routes } from 'react-router-dom'
import {Add,Home} from '../pages'

function Routers() {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Add />} />
        </Routes>
    </div>
  )
}

export default Routers