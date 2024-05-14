import React, { createContext, useState, ReactNode } from 'react';
import Tutor from '../models/TutorModel';

interface DataContextType {
    dataTutor: Tutor[];
    booking: Tutor[];
    addToList: (tutor: Tutor) => void;
    removeFromList: (id: number) => void;
    clearList: () => void;
    filterList: (std_id: string | undefined) => void;
    addToBooking: (data: Tutor) => void;
    removeFromBooking: (id: number) => void;
}

const initialDataContext: DataContextType = {
    dataTutor: [],
    booking: [],
    addToList: () => {},
    removeFromList: () => {},
    clearList: () => {},
    filterList: () => {},
    addToBooking: () => {},
    removeFromBooking: () => {},
};

const DataContext = createContext<DataContextType>(initialDataContext);

interface DataProviderProps {
    children: ReactNode;
}

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
    const [booking, setBooking] = useState<Tutor[]>([]);
    const [dataTutor, setdataTutor] = useState<Tutor[]>([{
        id: 0,
        std_id: "S001",
        std_name: "สมชาย เรียนดี",
        location: "ใต้หอชาย",
        time: "16:00",
        date: "2024-05-15",
        image: "useravatar.png",
        subject: "320-243 ประสาทกายวิภาคศาสตร์ทางทันตแพทยศาสตร์ ",
        teachingMode: "on-site",
        duration: 1,
        status: "confirmed"
      },
      {
        id: 1,
        std_id: "S002",
        std_name: "สมหญิง มานะบากบั่น",
        location: "หอสมุด",
        time: "20:00",
        date: "2024-05-16",
        image: "useravatar.png",
        subject: "324-104 เคมีพื้นฐาน ",
        teachingMode: "on-site",
        duration: 2,
        status: "confirmed"
      },
      {
        id: 2,
        std_id: "S003",
        std_name: "นายก นักเรียนตัวอย่าง",
        location: "ใต้ตึกวิศวะคอมพิวเตอร์",
        time: "10:00",
        date: "2024-05-17",
        image: "useravatar.png",
        subject: "324-104 เคมีพื้นฐาน ",
        teachingMode: "on-site",
        duration: 3,
        status: "pending"
      },
      {
        id: 3,
        std_id: "S004",
        std_name: "สมศรี ใฝ่รู้",
        location: "Discord",
        time: "18:00",
        date: "2024-05-18",
        image: "useravatar.png",
        subject: "320-233 จุลกายวิภาคศาสตร์ทางทันตแพทยศาสตร์ ",
        teachingMode: "online",
        duration: 1,
        status: "pending"
      },
      {
        id: 4,
        std_id: "S005",
        std_name: "สมบูรณ์ ขยันเรียน",
        location: "Co-working space คณะวิศวกรรมศาสตร์",
        time: "16:00",
        date: "2024-05-21",
        image: "useravatar.png",
        subject: "685-211 พยาธิวิทยาทั่วไป ",
        teachingMode: "on-site",
        duration: 1,
        status: "pending"
      }]);

    const addToList = (tutor: Tutor) => {
        setdataTutor([...dataTutor, tutor]);
    };

    const addToBooking = (data: Tutor) => {
        setBooking([...booking, data]);
    };

    const removeFromList = (id: number) => {
        setdataTutor(dataTutor.filter(item => item.id !== id));
    };

    const removeFromBooking = (id: number) => {
        setBooking(booking.filter(item => item.id !== id));
    };
;
    const filterList = (std_id: string | undefined) => {
        dataTutor.filter(item => item.std_id === std_id);
    };

    const clearList = () => {
        setdataTutor([]);
    };

    const value: DataContextType = { dataTutor, addToList, removeFromList, clearList, filterList, booking, addToBooking, removeFromBooking};

    return (
        <DataContext.Provider value={value}>
            {children}
        </DataContext.Provider>
    );
};

export { DataContext, DataProvider };
