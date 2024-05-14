import { useContext } from 'react'
import { FaHome, FaLessThan } from "react-icons/fa";
import { RiCalendarScheduleLine } from "react-icons/ri";
import { BsPersonBadge } from "react-icons/bs";
import { AuthContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';



function Sidebar() {
  const { studentData, studentImage } = useContext(AuthContext)
  const { sidebarToggle, setSidebarToggle } = useContext(AuthContext)
  return (
    <div
      className={`h-screen overflow-hidden transition-all bg-gradient-to-b from-zinc-800 to-zinc-900 ${sidebarToggle ? 'fixed w-72' : 'w-0'
        }`}
    >
      <div className="p-4">
        <div className="flex justify-end">
          <FaLessThan
            className="text-white w-6 h-6 cursor-pointer"
            onClick={() => setSidebarToggle(!sidebarToggle)}
          />
        </div>
        <div className="flex justify-center">
          {studentImage?.pictureBase64 ? (
            <img
              className="w-24 h-24 rounded-full m-4 shadow-lg"
              src={`data:image/png;base64,${studentImage?.pictureBase64}`}
            />
          ) : (
            <span className="loading loading-spinner loading-lg m-4 bg-white"></span>
          )}
        </div>
        <div className="flex justify-center">
          <div className="text-white font-semibold bg-gradient-to-r from-sky-500 to-indigo-500 rounded-full px-4 py-1">
            {studentData?.studNameThai && studentData?.studSnameThai
              ? `${studentData?.studNameThai} ${studentData?.studSnameThai}`
              : (<span className="loading loading-dots loading-sm bg-white"></span>)}
          </div>
        </div>
        <div className="flex justify-center items-center space-x-4 my-4">
          <div className="flex items-center space-x-1">
            <span className="text-amber-500 font-semibold">N/A</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-amber-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
              />
            </svg>
          </div>
          <div className="flex items-center space-x-1">
            <span className="text-amber-500 font-semibold">0 Hour</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-amber-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"
              />
            </svg>
          </div>
        </div>
        <hr className="mt-5 mb-2 border-gray-700"></hr>
        <ul className="text-gray-300">
          <li className="mb-2 rounded hover:shadow py-2 hover:bg-zinc-700 transition-colors duration-300">
            <Link className="px-3 flex items-center" to="/home">
              <FaHome className="inline-block w-6 h-6 mr-2 text-white" /> Home
            </Link>
          </li>
          <li className="mb-2 rounded hover:shadow py-2 hover:bg-zinc-700 transition-colors duration-300">
            <Link className="px-3 flex items-center" to="/tutor">
              <BsPersonBadge className="inline-block w-6 h-6 mr-2 text-white" /> Tutor
            </Link>
          </li>
          <li className="mb-2 rounded hover:shadow py-2 hover:bg-zinc-700 transition-colors duration-300">
            <Link className="px-3 flex items-center" to="/schedule">
              <RiCalendarScheduleLine className="inline-block w-6 h-6 mr-2 text-white" /> Schedule
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Sidebar