import React from 'react'
import Navbar from '../components/Navbar'

function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className='container mx-4 my-2'>
        <div className='grid grid-cols-4'>
          <div className='col-span-1 flex flex-col'>
          <select className="my-5 select select-bordered w-full max-w-xs font-bold border-black">
            <option disabled selected className='font-semibold font-sans'>เลือกรายวิชา</option>
            <option className='font-semibold font-sans'>240-218</option>
            <option className='font-semibold font-sans'>240-228</option>
          </select>
          <div>
        <h1 className = "my-4 font-bold">รูปแบบการสอน</h1>
        <div className="form-control">
            <label className="cursor-pointer label">
                <span className="label-text font-sans font-semibold">การสอนแบบ Inclass</span>
                <input type="checkbox" defaultChecked className="mx-4 checkbox checkbox-xs checkbox-success" />
            </label>
        </div>
        <div className="form-control">
            <label className="cursor-pointer label">
                <span className="label-text font-sans font-semibold">การสอนแบบออนไลน์</span>
                <input type="checkbox" defaultChecked className="mx-4 checkbox checkbox-xs checkbox-success" />
            </label>
        </div>
        <div className="form-control">
            <label className="cursor-pointer label">
                <span className="label-text font-sans font-semibold">ทั้งสองรูปแบบ</span>
                <input type="checkbox" defaultChecked className="mx-4 checkbox checkbox-xs checkbox-success" />
            </label>
        </div>
    </div>
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