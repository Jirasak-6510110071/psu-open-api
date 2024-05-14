import React, { useState, useContext, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { DataContext } from '../context/DataContext';

interface EventData {
    date: string;
    time: string;
    location: string;
    selectedCourse: string;
    teachingMode: string;
    duration: number;

}

interface Props {
    showForm: boolean;
    setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const EventForm: React.FC<Props> = ({ showForm, setShowForm }) => {
    const { dataTutor, addToList, addToBooking } = useContext(DataContext);
    const { studentData, studentImage, studentSubject } = useAuth()
    const [formData, setFormData] = useState<EventData>({
        date: '',
        time: '',
        location: '',
        selectedCourse: '',
        teachingMode: '',
        duration: 1,
    });
    const [errors, setErrors] = useState({
        date: '',
        time: '',
        location: '',
        selectedCourse: '',
        teachingMode: '',
        duration: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFormData({
            ...formData,
            selectedCourse: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            date: formData.date ? '' : 'กรุณาเลือกวันที่',
            time: formData.time ? '' : 'กรุณาเลือกเวลา',
            location: formData.location ? '' : 'กรุณากรอกสถานที่',
            selectedCourse: formData.selectedCourse ? '' : 'กรุณาเลือกรายวิชา',
            teachingMode: formData.teachingMode ? '' : 'กรุณาเลือกรูปแบบการสอน',
            duration: formData.duration ? '' : 'กรุณาเลือกจำนวนเวลาที่จะสอน',
        };
        setErrors(newErrors);
        const hasErrors = Object.values(newErrors).some((error) => error !== '');
        if (!hasErrors) {
            const data = {
                id: dataTutor.length,
                std_id: studentData?.studentId,
                std_name: `${studentData?.studNameThai} ${studentData?.studSnameThai}`,
                location: formData.location,
                time: formData.time,
                date: formData.date,
                image: studentImage?.pictureBase64,
                subject: formData.selectedCourse,
                teachingMode: formData.teachingMode,
                duration : formData.duration,
                status: "waiting"
            }
            addToList(data);
            addToBooking(data)
            handleButtonClick();
        }
    };

    const handleButtonClick = () => {
        setShowForm(!showForm);
    };
    useEffect(() => {

    }, [errors]);

    return (
        <div className="flex justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-96 absolute z-40"
            >
                <div className="mb-2">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="date"
                    >
                        วันที่
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="date"
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    {errors.date && <p className="text-red-500 text-xs italic">{errors.date}</p>}
                </div>
                <div className="mb-2">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="time"
                    >
                        เวลา
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="time"
                        type="time"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                    />
                    {errors.date && <p className="text-red-500 text-xs italic">{errors.time}</p>}
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2">จำนวนเวลาที่จะสอน (ชั่วโมง)</label>
                    <input
                        type="number"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        min="1"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.date && <p className="text-red-500 text-xs italic">{errors.duration}</p>}
                </div>
                <div className="mb-2">
                    <label
                        className="block text-gray-700 font-bold mb-2"
                        htmlFor="location"
                    >
                        สถานที่
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="location"
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                    {errors.date && <p className="text-red-500 text-xs italic">{errors.location}</p>}
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2">รายวิชา</label>
                    <select
                        value={formData.selectedCourse}
                        onChange={handleCourseChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    >
                        <option value="">-- เลือกรายวิชา --</option>
                        {studentSubject?.map((subject) => (
                            <option key={subject.subjectId} value={`${subject.subjectCode} ${subject.subjectNameThai}`}>
                                {`${subject.subjectCode} ${subject.subjectNameThai}`}
                            </option>
                        ))}
                    </select>
                    {errors.date && <p className="text-red-500 text-xs italic">{errors.selectedCourse}</p>}
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 font-bold mb-2">รูปแบบการสอน</label>
                    <div>
                        <label className="inline-flex items-center mr-4">
                            <input
                                type="radio"
                                name="teachingMode"
                                value="online"
                                checked={formData.teachingMode === 'online'}
                                onChange={handleChange}
                                className="form-radio"
                            />
                            <span className="ml-2">online</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="teachingMode"
                                value="onsite"
                                checked={formData.teachingMode === 'onsite'}
                                onChange={handleChange}
                                className="form-radio"
                            />
                            <span className="ml-2">on-site</span>
                        </label>
                        {errors.date && <p className="text-red-500 text-xs italic">{errors.teachingMode}</p>}
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Submit
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={handleButtonClick}
                    >
                        Close
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;