import React from 'react'
import axios from 'axios'
import Student from '../models/Student';
import Repo from "../repositories"
import { useState, useEffect } from 'react';
import Card from '../components/Card';


import Navbar from '../components/Navbar'

function Home() {
  const [studentData, setStudentData] = useState<Student[]>([]);

  const fetchData = async () => {
    const res = await Repo.Studentdata.getAll()
    if (res) {
      setStudentData(res)
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <div className="container mx-auto">
        <div className='grid grid-cols-4 gap-2'>
          <div className='col-span-1 p-2'>
            <select className="my-5 select select-bordered w-full max-w-xs font-bold border-black">
              <option disabled selected className='font-semibold font-sans'>เลือกรายวิชา</option>
              <option className='font-semibold font-sans'>240-218</option>
              <option className='font-semibold font-sans'>240-228</option>
            </select>
            <div>
              <h1 className="my-4 font-bold">รูปแบบการสอน</h1>
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
          <div className='col-span-3 grid grid-cols-3 gap-2'>
              {studentData.map((item) =>
                  <Card key={item.studentId} StudentData={item} />
              )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Home