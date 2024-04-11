import React from 'react'
import Navbar from '../components/Navbar'
import Checkbox from '../components/Checkbox'

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className='container mx-4 my-2'>
        <div className='grid grid-cols-4'>
          <div className='col-span-1 flex flex-col'>
          <select className="select select-bordered w-full max-w-xs">
            <option disabled selected>เลือกรายวิชา</option>
            <option>240-218</option>
            <option>240-228</option>
          </select>
            <Checkbox></Checkbox>
          </div>
          <div className='col-span-3 flex flex-col'>
            <div className='grid grid-cols-3'>
              
            </div>
        </div>
        </div>
      </div>
    </>
  )
}

export default Home