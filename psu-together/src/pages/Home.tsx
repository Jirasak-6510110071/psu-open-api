import { useContext, useEffect } from 'react';
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthProvider';
import { DataContext } from '../context/DataContext';
import Tutor from '../models/TutorModel';


function Home() {
  const { sidebarToggle, studentData} = useAuth()
  const { dataTutor, removeFromList, addToBooking} = useContext(DataContext);
  const isAvatar = (url: string | undefined) => {
    if (url === "useravatar.png") return true;
  };

  const isSelf = (std_id: string | undefined) => {
    if (std_id === studentData?.studentId) return true;
  };

  const bookTutor = (id: number, data: Tutor) => {
    removeFromList(id);
    addToBooking(data)
  };

  return (
    <div className='flex'>
      <Sidebar />
      <div className={`${sidebarToggle ? "ml-72" : ""} w-full`}>
        <Navbar />
        <div className="overflow-x-auto">
          <table className="table w-full">
            <caption className="text-xl font-bold text-gray-800 my-4 text-center">
              รายการนัดติว
            </caption>
            {/* head */}
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">ผู้ติว</th>
                <th className="px-4 py-2">วันที่เวลา และ สถานที่</th>
                <th className="px-4 py-2">วิชาที่สอน</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {dataTutor.map((item) => (
                <tr key={item.id} className="hover">
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-3">
                      {isAvatar(item.image) ? (
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={item.image} alt="Avatar" />
                          </div>
                        </div>
                      ) : (
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img src={`data:image/png;base64,${item.image}`} alt="Avatar" />
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="font-bold">{item.std_name}</div>
                        <div className="text-sm text-gray-500">{item.std_id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    {`${item.date} | ${item.time}`}
                    <br />
                    <span className="badge badge-ghost badge-sm mr-1">{item.location}</span>
                    <span className="badge badge-ghost badge-sm">{`${item.duration} ชั่วโมง`}</span>
                  </td>
                  <td className="px-4 py-2">
                    {item.subject}
                    <br />
                    {item.teachingMode === "online" ? (
                      <span className="badge badge-accent badge-sm">{item.teachingMode}</span>
                    ) : (
                      <span className="badge badge-primary badge-sm">{item.teachingMode}</span>
                    )}
                  </td>
                  {isSelf(item.std_id) ? (
                    <td className="px-4 py-2"></td>
                  ) : (
                    <td className="px-4 py-2">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        onClick={() => bookTutor(item.id, item)}
                      >
                        จอง
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default Home