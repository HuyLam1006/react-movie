import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'

const MainBo = () => {
  return (
    <>
      <Header></Header>
      <Outlet />
    </>
  )
}

export default MainBo
