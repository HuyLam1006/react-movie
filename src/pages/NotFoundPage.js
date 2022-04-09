import Button from 'components/button/Button'
import React from 'react'
import Error404 from '../assets/svg/error.svg'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <>
      <div className="block mb-10">
        <div className="flex items-center justify-center">
          <img src={Error404} alt="" className="w-[600px] h-[600px]" />
        </div>
        <div className="flex items-center justify-center">
          <Button>
            <Link to="/" className="font-bold uppercase">
              Go To HomePage
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

export default NotFoundPage
