import React from 'react'

function Footer({trip}) {
  return (
    <div className='my-7'>
        <h2 className='text-center text-gray-400'>Created by: {trip?.userEmail}</h2>
    </div>
  )
}

export default Footer