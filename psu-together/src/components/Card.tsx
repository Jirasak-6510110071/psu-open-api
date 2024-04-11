import React from 'react'
import Student from '../models/Student'

interface Props {
  StudentData: Student
}

function Card(props: Props) {
  return (
    <div className="card-normal bg-base-100 shadow-xl my-1 mx-1 rounded-lg border-2">
      <div className="avatar flex justify-center my-2">
        <div className="w-24 rounded-full ">
          <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
        </div>
      </div>
      <div className="card-body ">
        <h2 className="card-title">{props.StudentData.studNameThai +" " + props.StudentData.studSnameThai}</h2>
        <p>{props.StudentData.studentId + " " + props.StudentData.facNameThai + " " + props.StudentData.campusNameThai}</p>
        <div className="card-actions justify-end flex justify-center">
          <button className="btn btn-primary ">Select</button>
        </div>
      </div>
    </div>
  )
}
export default Card
