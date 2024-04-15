import { useState, useEffect } from 'react';
import Student from '../models/Student';
import Repo from "../repositories"
import Card from '../components/Card';


import Navbar from '../components/Navbar'

function Home() {
  const [studentData, setStudentData] = useState<Student[]>([]);
  const [selectedValue, setSelectedValue] = useState<string>('');

  const fetchData = async () => {
    const res = await Repo.Studentdata.getAll()
    if (res) {
      setStudentData(res)
    }
  }

  const fetchDataByCampus = async () => {
    const res = await Repo.Studentdata.getByCampusID(selectedValue)
    if (res) {
      setStudentData(res)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.selectedIndex === 6) {
      fetchData()
    } else{
      setSelectedValue('0' + e.target.selectedIndex.toString());
    }
  };

   useEffect(() => {
    fetchDataByCampus();
    if (!selectedValue) {
      fetchData();
    }
  }, [selectedValue]);
  return (
    <>
      <Navbar></Navbar>

      <div className="container mx-auto">
        <div className='grid grid-cols-4 gap-2'>
          <div className='col-span-1 p-2'>
            <select className="my-5 select select-bordered w-full max-w-xs font-bold border-black" onChange={handleChange}>
              <option disabled selected className='font-semibold font-sans'>เลือกวิทยาเขต</option>
              <option className='font-semibold font-sans'>วิทยาเขตหาดใหญ่</option>
              <option className='font-semibold font-sans'>วิทยาเขตปัตตานี</option>
              <option className='font-semibold font-sans'>วิทยาเขตภูเก็ต</option>
              <option className='font-semibold font-sans'>วิทยาเขตสุราษฎร์ธานี</option>
              <option className='font-semibold font-sans'>วิทยาเขตตรัง</option>
              <option className='font-semibold font-sans'>ทุกวิทยาเขต</option>
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