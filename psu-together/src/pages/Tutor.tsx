import { useContext, useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthProvider';
import { DataContext } from '../context/DataContext';
import EventForm from '../components/EventForm';
import Review from '../models/Review';



function Tutor() {
    const { dataTutor, removeFromList, removeFromBooking, booking, updateStatus, myTutor, removeFromMyTutor, review, addToReview } = useContext(DataContext);
    const { sidebarToggle, studentData } = useAuth();
    const [showForm, setShowForm] = useState(false);
    const [showMyTutors, setShowMyTutors] = useState(true);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState<number>(0);
    const [reviewData, setReviewData] = useState<Review>({
        id: 0,
        std_id: '',
        rating: 0,
        hour: 0,
        review: null,
    });

    const handleReviewSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const confirmedBooking = booking.find(item => item.id === selectedBooking);
        if (confirmedBooking) {
            setShowReviewForm(false);
            const data = {
                id: selectedBooking,
                std_id: confirmedBooking.std_id,
                rating: reviewData.rating,
                hour: confirmedBooking.duration,
                review: reviewData.review,
            };
            addToReview(data);
            updateStatus(confirmedBooking.id, "success"); 
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setReviewData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };

    const removeBooking = (id: number) => {
        removeFromList(id);
        removeFromBooking(id);
    };

    useEffect(() => {
    }, [dataTutor, booking, myTutor, showReviewForm]);

    const renderButtons_Booking = (status: string, id: number) => {
        switch (status) {
            case 'confirmed':
                return (
                    <>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                setShowReviewForm(true);
                                setSelectedBooking(id);
                            }}
                        >
                            สำเร็จ
                        </button>
                    </>
                );
            case 'pending':
                return (
                    <>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => {
                                updateStatus(id, "cancelled");
                            }}
                        >
                            ยกเลิก
                        </button>
                    </>
                );
            case 'success':
                return (
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => removeBooking(id)}
                    >
                        ลบ
                    </button>
                );
            case 'cancelled':
                return (
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => removeBooking(id)}
                    >
                        ลบ
                    </button>
                );
            default:
                return null;
        }
    };

    const renderButtons_Tutor = (status: string, id: number) => {
        const selected = review.find(item => item.id === id);
        switch (status) {
            case 'pending':
                return (
                    <>
                        <button
                            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-1"
                            onClick={() => updateStatus(id, "confirmed")}
                        >
                            ยืนยัน
                        </button>
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => updateStatus(id, "cancelled")}
                        >
                            ยกเลิก
                        </button>
                    </>
                );
            case 'success':
                return (
                    <div>{selected?.review}</div>
                );
            case 'cancelled':
                return (
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => removeFromMyTutor(id)}
                    >
                        ลบ
                    </button>
                );
            default:
                return null;
        }
    };

    return (
        <div className='flex'>
            <Sidebar />
            <div className={`${sidebarToggle ? "ml-72" : ""} w-full`}>
                <Navbar />

                <div>
                    {showForm && <EventForm showForm={showForm} setShowForm={setShowForm} />}
                </div>
                <div>
                    {showReviewForm && (
                        <div className="absolute inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-xl font-bold mb-4">แบบประเมินความพึงพอใจ</h2>
                                <form onSubmit={handleReviewSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="rating" className="block font-bold mb-2">
                                            คะแนนประเมิน:
                                        </label>
                                        <input
                                            type="number"
                                            id="rating"
                                            name="rating"
                                            value={reviewData.rating}
                                            onChange={handleInputChange}
                                            min="1"
                                            max="5"
                                            className="border border-gray-400 p-2 rounded w-full"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label htmlFor="review" className="block font-bold mb-2">
                                            รีวิว:
                                        </label>
                                        <textarea
                                            id="review"
                                            name="review"
                                            value={reviewData.review || ''}
                                            onChange={handleInputChange}
                                            className="border border-gray-400 p-2 rounded w-full"
                                        ></textarea>
                                    </div>
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            ส่งรีวิว
                                        </button>
                                        <button
                                            onClick={() => setShowReviewForm(false)}
                                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-2"
                                        >
                                            ยกเลิก
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
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
                                            {renderButtons_Tutor(item.status, item.id)}
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
                                {booking.map((item) => (
                                    <tr className="hover" key={item.std_id}>
                                        <td className="px-4 py-2">{`${item.date} ${item.time}`}</td>
                                        <td className="px-4 py-2">{item.subject}</td>
                                        <td className="px-4 py-2">{`${item.location}`}</td>
                                        <td className="px-4 py-2">{`${item.duration} ชั่วโมง`}</td>
                                        <td className="px-4 py-2">{item.status}</td>
                                        <td className="px-4 py-2">
                                            {renderButtons_Booking(item.status, item.id)}
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