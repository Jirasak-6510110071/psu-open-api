import { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthProvider';
import { DataContext } from '../context/DataContext';
import EventForm from '../components/EventForm';
import TutorModel from '../models/TutorModel';



function Tutor() {
    const { dataTutor, removeFromList, removeFromBooking, booking } = useContext(DataContext);
    const { sidebarToggle, studentData } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [myTutor, setMyTutor] = useState<TutorModel[]>([]);
    const [myBooking, setMyBooking] = useState<TutorModel[]>([]);
    const [showMyTutors, setShowMyTutors] = useState(true);

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };

    const removeBooking = (id: number) => {
        removeFromList(id);
        removeFromBooking(id);
    };

    useEffect(() => {
        const filterData = dataTutor.filter(item => item.std_id === studentData?.studentId);
        const filterBooking = booking.filter(item => item.std_id !== studentData?.studentId);
        setMyTutor(filterData)
        setMyBooking(filterBooking)
    }, [dataTutor]);
    return (
        <div className='flex'>
            <Sidebar />
            <div className={`${sidebarToggle ? "ml-72" : ""} w-full`}>
                <Navbar />

                <div>
                    {showForm && <EventForm showForm={showForm} setShowForm={setShowForm} />}
                </div>
                <div className="flex justify-between items-center mb-4">
                    <div className="flex flex-wrap border-b border-gray-200">
                        <button
                            className={`px-6 py-3 font-medium text-gray-600 hover:text-gray-800 focus:outline-none ${showMyTutors
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : ''
                                }`}
                            onClick={() => setShowMyTutors(true)}
                        >
                            รายการนัดติวของฉัน
                        </button>
                        <button
                            className={`px-6 py-3 font-medium text-gray-600 hover:text-gray-800 focus:outline-none ${!showMyTutors
                                ? 'border-b-2 border-blue-500 text-blue-500'
                                : ''
                                }`}
                            onClick={() => setShowMyTutors(false)}
                        >
                            รายการจองติวของฉัน
                        </button>
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                        onClick={handleButtonClick}
                    >
                        <span className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 mr-2"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            เปิดติว
                        </span>
                    </button>
                </div>
                {showMyTutors ? (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <caption className="text-xl font-bold text-gray-800 mb-4 text-center">
                                รายการนัดติวของฉัน
                            </caption>
                            {/* head */}
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Subject</th>
                                    <th className="px-4 py-2">Location</th>
                                    <th className="px-4 py-2">Duration</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {myTutor.map((item) => (
                                    <tr className="hover" key={item.std_id}>
                                        <td className="px-4 py-2">{`${item.date} ${item.time}`}</td>
                                        <td className="px-4 py-2">{item.subject}</td>
                                        <td className="px-4 py-2">{`${item.location}`}</td>
                                        <td className="px-4 py-2">{`${item.duration} ชั่วโมง`}</td>
                                        <td className="px-4 py-2">{item.status}</td>
                                        <td className="px-4 py-2">
                                            {item.status === "confirmed" ? (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => removeBooking(item.id)}
                                                >
                                                    สำเร็จ
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => removeBooking(item.id)}
                                                >
                                                    ยกเลิก
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <caption className="text-xl font-bold text-gray-800 mb-4 text-center">
                                รายการจองติวของฉัน
                            </caption>
                            {/* head */}
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="px-4 py-2">Date</th>
                                    <th className="px-4 py-2">Subject</th>
                                    <th className="px-4 py-2">Location</th>
                                    <th className="px-4 py-2">Duration</th>
                                    <th className="px-4 py-2">Status</th>
                                    <th className="px-4 py-2"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {myBooking.map((item) => (
                                    <tr className="hover" key={item.std_id}>
                                        <td className="px-4 py-2">{`${item.date} ${item.time}`}</td>
                                        <td className="px-4 py-2">{item.subject}</td>
                                        <td className="px-4 py-2">{`${item.location}`}</td>
                                        <td className="px-4 py-2">{`${item.duration} ชั่วโมง`}</td>
                                        <td className="px-4 py-2">{item.status}</td>
                                        <td className="px-4 py-2">
                                            {item.status === "confirmed" ? (
                                                <button
                                                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => removeBooking(item.id)}
                                                >
                                                    สำเร็จ
                                                </button>
                                            ) : (
                                                <button
                                                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                    onClick={() => removeBooking(item.id)}
                                                >
                                                    ยกเลิก
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tutor