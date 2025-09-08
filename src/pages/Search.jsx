import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Search() {
    const navigate = useNavigate()

    const handleBack = () => {
        navigate('/')
    }

  return (
    <div>
      <p className='text-2xl'>This page is currently unavailable at the moment.</p>
      <p className='p-10 text-2xl'>Continue browsing?...</p>

        <button onClick={handleBack}>Take me back</button>
    </div>
  )
}
