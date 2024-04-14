import React from 'react'
import Student from '../models/Student'
import UserAvatar from '../assets/useravatar.png'

interface Props {
  StudentData: Student
}

function Card(props: Props) {
  return (
    <div className='grid grid-rows-2 border-2 border-black rounded-lg p-2 bg-white hover:bg-gray-200'>
      <div className='grid grid-cols-3'>
        <div className='w-20 justify-self-center'>
          <img src={UserAvatar} className='justify-center' />
        </div>
        <div className='col-span-2'>
          <div>
            {props.StudentData.titleName + props.StudentData.studNameThai + " " + props.StudentData.studSnameThai}
          </div>
          <div>
            {props.StudentData.studentId + " " + props.StudentData.facNameThai}
          </div>
          <div>
            {props.StudentData.campusNameThai}
          </div>
        </div>
      </div>
      <div>
      </div>
    </div>
  )
}
export default Card
